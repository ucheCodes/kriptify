import logo from '../../images/logo.png';
const Footer = () => {
    return(
        <div className="w-full flex md justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className="wt-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className="flex flex-[0.5] justify-center items-center">
                     <img src={logo} alt="logo" className = "wt-32"/>
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-4 w-full">
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorial</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Wallet</p>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">For more info, send a mail to :</p>
                <p className="text-white text-sm text-center">info@kryptmastery.com</p>
                <p className="text-white text-sm text-center">uchevictor610@gmail.com</p>
            </div>
            <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5'/>

            <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
                <p className="text-white text-sm text-center">@peter's soft network 2022</p>
                <p className="text-white text-sm text-center">all rights reserved</p>
            </div>
        </div>
    )
}

export default Footer;  