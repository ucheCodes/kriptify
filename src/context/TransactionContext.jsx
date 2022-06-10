import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import { contractABI,contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();


const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
    //console.log({provider,signer, transactionContract});
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo:"",amount:"",keyword:"",message:""});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState,[name]:e.target.value}));
    }
    const getAllTransaction = async () => {
        try {
            if(!ethereum) return alert("please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            console.log(availableTransactions);
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo : transaction.receiver,
                addressFrom : transaction.sender,
                timestamp : new Date(transaction.timeStamp.toNumber() * 1000).toLocaleString(),
                message : transaction.message,
                keyword : transaction.keyword,
                amount : parseInt(transaction.amount._hex) / (10**18)
            }))
            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
        } catch (error) {
            console.error(error);
        }
    }

    const checkIfWalletIsConnected = async () =>{
        try {
        if(!ethereum) return alert("please install metamask");

            const accounts = await ethereum.request({method: 'eth_accounts'});
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransaction();
            }
            else{
                console.log("No accounts found");
            }
            console.log(accounts);
        } 
        catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }
    const checkIfTransactionExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            console.log(transactionCount);
             window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.log(error);
            throw new Error("No transaction recorded as no ethereum account is found");
        }
    }
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("please install metamask");
    
            const accounts = await ethereum.request({method: 'eth_requestAccounts'}); 
            setCurrentAccount(accounts[0]); 
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("please install metamask");
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);//converts the amount in eths to hex or gwei

            await ethereum.request({
                method : "eth_sendTransaction",
                params : [{
                    from : currentAccount,
                    to : addressTo,
                    gas : '0x5208',//21000 gwei in hex
                    value : parsedAmount._hex,//converts the parsed amount to hexadecimal
                }]
            });
            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
           // window.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }
    useEffect(() => {//runs on app initialization
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    },[]);
    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading}}>
            {children}
        </TransactionContext.Provider>

    )
}