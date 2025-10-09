import { useEffect, useState } from "react"

const useAPOD = (key = "DEMO_KEY", date) => {
  const [data, setData] = useState({})

  useEffect(() => {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${key}`
    if (date) url += `&date=${date}`

    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [key, date]) // include date here
  

  return data
}

export default useAPOD
