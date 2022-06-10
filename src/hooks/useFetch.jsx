/*
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({keyword}) => {
    const [gifUrl, setGifUrl] = useState("");
    const fetchGifs = async () =>{
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const {data} = await response.json();

            setGifUrl(data[0]?.images?.downsized_medium?.url);
        } catch (error) {
            //console.error("gif error \n"+ error);
            setGifUrl("https://www.omnisend.com/blog/wp-content/uploads/2016/09/funny-gifs-9.gif");
        }
    }

    useEffect(() => {
        if (keyword) {
            fetchGifs();
        }
    },[keyword]);
    return gifUrl;
}
export default useFetch;
*/
import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
    //   const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
    //   const { data } = await response.json();

    //   setGifUrl(data[0]?.images?.downsized_medium.url);
        var url = "https://www.omnisend.com/blog/wp-content/uploads/2016/09/funny-gifs-9.gif";
        setGifUrl(url);
    } catch (error) {
      setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;


/*
  git remote add origin https://github.com/ucheCodes/kriptify.git
git branch -M main
git push -u origin main
*/