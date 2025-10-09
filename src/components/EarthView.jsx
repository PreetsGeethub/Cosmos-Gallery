import React, { useState } from 'react'
import useEarthImage from '../hooks/useEarthImage';
function EarthView() {
    const [longtitude, setLongtitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [date, setDate] = useState('')
    const [searchLongitude, setSearchLongitude] = useState("");
    const [searchLatitude, setSearchLatitude] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchLatitude(latitude)
        setSearchLongitude(longtitude)
        setSearchDate(date)
    }
    const handleUseMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongtitude(position.coords.longitude);
                },
                (error) => {
                    alert("Could not get your location: " + error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    let apiKey = import.meta.env.VITE_NASA_API_KEY;
    const { imageObject, errorMsg, loading } = useEarthImage(apiKey, searchLongitude,
        searchLatitude,
        searchDate);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder='Longtitude' value={longtitude} onChange={(e) => setLongtitude(Number(e.target.value))} />
                <input type="number" placeholder='Latitude' value={latitude} onChange={(e) => setLatitude(Number(e.target.value))} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <div className="flex gap-2">
                    <button type="submit">Search</button>
                    <button type="button" onClick={handleUseMyLocation}>
                        Use My Location
                    </button>
                </div>

            </form>
            {loading && (
                <p className="text-gray-600">Loading Image...</p>
            )}
            {errorMsg && !loading && (
                <p className="text-red-600">{errorMsg}</p>
            )}
            <div>
                {imageObject && (
                    <img src={imageObject} alt="Earth satellite view" className="rounded" />
                )}

            </div>
        </>
    )
}

export default EarthView