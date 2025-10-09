import { useEffect, useState } from "react";

const useEarthImage = (apiKey, lon, lat, date) => {
  const [imageObject, setImageObject] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Don’t fetch if lat/lon are missing
    if (!lat || !lon) return;

    setLoading(true);
    setErrorMsg("");

    let url = `http://localhost:5000/earth?lon=${lon}&lat=${lat}${date ? `&date=${date}` : ''}`;

    if (date) {
      url += `&date=${date}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Earth image");
        }
        return response.blob();
      })
      .then((blob) => {
        setImageObject(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch((e) => {
        setErrorMsg(e.message);
        setLoading(false);
      });
  }, [lon, lat, date, apiKey]);

  return { imageObject, errorMsg, loading };
};

export default useEarthImage;
