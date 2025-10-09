import {useState,useEffect} from 'react'
const useNasaMedia = (keyword,mediaType)=>{
    const [data,setData] = useState({})
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let url = `https://images-api.nasa.gov/search?q=${keyword}`
        if(mediaType){
           url+=`&media_type=${mediaType}`
        }
        fetch(url)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Failed to fetch NASA media");
            }
            return response.json()
        })
        .then((json)=>{
            setData(json.collection?.items || [])
            setLoading(false)
        })
        .catch((e)=>{
            setErrorMsg(e.message)
            setLoading(false)
        })
    }, [keyword,mediaType])
    return {data,errorMsg,loading}
}
export default useNasaMedia