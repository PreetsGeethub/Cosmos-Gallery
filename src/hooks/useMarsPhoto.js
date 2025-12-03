import { useState } from 'react';
import {useEffect} from 'react'

const useMarsPhoto = (apikey="LyXdwyNfic3xzFdzn9xvk862BGoZGQDemL9qeK",rover="curiosity",date,cameraAngle,page=1)=>{
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const roverDates = {
        curiosity: { start: "2012-08-06", end: new Date().toISOString().split("T")[0] },
        opportunity: { start: "2004-01-25", end: "2018-06-11" },
        spirit: { start: "2004-01-04", end: "2010-03-21" }
      };
      const [message, setMessage] = useState("");
    useEffect(() => {
        if (!rover || !date) return;

        const { start, end } = roverDates[rover];
        if (date < start || date > end) {
          setData([]);
          setLoading(false);
          setMessage(`⚠️ ${rover} was not active on ${date}`);
          return;
        }

        let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apikey}`;
        if(date) url+=`&earth_date=${date}`
        if(cameraAngle) url+=`&camera=${cameraAngle}`
        if (page) url += `&page=${page}`;
        // if(sol) url+=`&sol=${sol}`

        fetch(url)
        .then((response)=>response.json())
        .then((response)=> {
            console.log("Mars API Response:", response);
            setData(response.photos || []);
            setLoading(false);
        })
        .catch((e)=>{
            console.log("error in fething data",e)
            setLoading(false)
        })
        console.log("Fetching from:", url);

    }, [apikey, rover,date,cameraAngle,page])
    return {data,loading,message}
}

export default useMarsPhoto