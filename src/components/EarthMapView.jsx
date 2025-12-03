import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// Fix for missing marker icons - use CDN URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});
// Helper component to re-center the map dynamically
function RecenterMap({ lat, lon }) {
    const map = useMap();
    React.useEffect(() => {
        if (lat && lon) {
            map.setView([lat, lon], 5);
        }
    }, [lat, lon, map]);
    return null;
}

export default function EarthMapView() {
    const [latitude, setLatitude] = useState(20);
    const [longitude, setLongitude] = useState(0);
    const [searchLat, setSearchLat] = useState(null);
    const [searchLon, setSearchLon] = useState(null);
    const [showMarker, setShowMarker] = useState(false);
    const [weather, setWeather] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // NASA GIBS tile layer
    const [layer] = useState(
        "MODIS_Terra_CorrectedReflectance_TrueColor"
    );
    const [date] = useState("2023-01-01");
    const LAYER_URL = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;

    // Fetch weather data from Open-Meteo (free, no API key needed)
    const fetchWeather = async (lat, lon) => {
        console.log("Fetching weather for:", lat, lon);
        try {
            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
            );
            const data = await res.json();
            console.log("Weather data received:", data);
            
            // Convert weather code to description
            const weatherCodes = {
                0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
                45: "Foggy", 48: "Foggy", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
                61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow",
                80: "Light showers", 81: "Showers", 82: "Heavy showers", 95: "Thunderstorm"
            };
            
            const weatherDescription = weatherCodes[data.current?.weather_code] || "Unknown";
            
            const weatherData = {
                temp: data.current?.temperature_2m,
                humidity: data.current?.relative_humidity_2m,
                windSpeed: data.current?.wind_speed_10m,
                description: weatherDescription
            };
            
            console.log("Setting weather state:", weatherData);
            setWeather(weatherData);
        } catch (err) {
            console.error("Error fetching weather:", err);
            setWeather({ error: true });
        }
    };

    // Search button handler
    const handleSearch = () => {
        setSearchLat(latitude);
        setSearchLon(longitude);
        setShowMarker(true);
        fetchWeather(latitude, longitude);
    };

    // Use My Location handler
    const handleUseMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    setLatitude(lat);
                    setLongitude(lon);
                    setSearchLat(lat);
                    setSearchLon(lon);
                    setShowMarker(true);
                    fetchWeather(lat, lon);
                },
                (err) => alert("Could not get location: " + err.message)
            );
        } else {
            alert("Geolocation not supported by this browser");
        }
    };

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#000" }}>
            {/* Info Header */}
            <div style={{ 
                padding: "20px", 
                backgroundColor: "rgba(0, 0, 0, 0.9)", 
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "center"
            }}>
                <h1 style={{ 
                    margin: "0 0 10px 0", 
                    fontSize: isMobile ? "24px" : "32px", 
                    color: "#64b5f6",
                    fontWeight: "bold"
                }}>
                    🌍 Earth Weather Explorer
                </h1>
                <p style={{ 
                    margin: 0, 
                    fontSize: isMobile ? "12px" : "14px", 
                    color: "#aaa",
                    maxWidth: "800px",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    Explore real-time satellite imagery from NASA and get current weather data for any location on Earth. 
                    Enter coordinates or use your location to see live weather conditions.
                </p>
            </div>

            {/* Controls */}
            <div style={{ padding: "15px", backgroundColor: "rgba(0, 0, 0, 0.8)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                    <input
                        type="number"
                        step="any"
                        placeholder="Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(Number(e.target.value))}
                        style={{ 
                            padding: "8px", 
                            borderRadius: "4px", 
                            border: "1px solid rgba(255, 255, 255, 0.3)", 
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "#fff",
                            width: "120px"
                        }}
                    />
                    <input
                        type="number"
                        step="any"
                        placeholder="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(Number(e.target.value))}
                        style={{ 
                            padding: "8px", 
                            borderRadius: "4px", 
                            border: "1px solid rgba(255, 255, 255, 0.3)", 
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "#fff",
                            width: "120px"
                        }}
                    />
                    <button onClick={handleSearch} style={{ padding: "8px 16px", borderRadius: "4px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
                        Search
                    </button>
                    <button onClick={handleUseMyLocation} style={{ padding: "8px 16px", borderRadius: "4px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                        Use My Location
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: isMobile ? "column" : "row" }}>
                {/* Map */}
                <div style={{ 
                    flex: 1, 
                    minHeight: isMobile ? "400px" : "auto",
                    height: isMobile ? "400px" : "auto",
                    position: "relative"
                }}>
                    <MapContainer 
                        center={[20, 0]} 
                        zoom={3} 
                        style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
                    >
                        <TileLayer url={LAYER_URL} />
                        {searchLat && searchLon && (
                            <>
                                <RecenterMap lat={searchLat} lon={searchLon} />
                                {showMarker && (
                                    <Marker position={[searchLat, searchLon]}>
                                        <Popup>
                                            <div style={{ textAlign: "center" }}>
                                                <strong>📍 Location</strong>
                                                <br />
                                                {searchLat.toFixed(4)}, {searchLon.toFixed(4)}
                                            </div>
                                        </Popup>
                                    </Marker>
                                )}
                            </>
                        )}
                    </MapContainer>
                </div>

                {/* Weather Card */}
                {weather && (
                    <div style={{ 
                        width: isMobile ? "100%" : "320px", 
                        padding: "20px", 
                        backgroundColor: "rgba(0, 0, 0, 0.85)", 
                        backdropFilter: "blur(10px)",
                        boxShadow: isMobile ? "0 -2px 10px rgba(0,0,0,0.3)" : "-2px 0 10px rgba(0,0,0,0.3)",
                        overflowY: "auto",
                        maxHeight: isMobile ? "calc(100vh - 400px - 140px)" : "auto",
                        flex: isMobile ? "1" : "none"
                    }}>
                        <h2 style={{ marginTop: 0, fontSize: "24px", marginBottom: "20px", color: "#fff" }}>
                            🌤️ Weather Info
                        </h2>
                        
                        <div style={{ 
                            backgroundColor: "rgba(255, 255, 255, 0.1)", 
                            padding: "15px", 
                            borderRadius: "8px",
                            marginBottom: "15px",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}>
                            <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#fff" }}>📍 Coordinates</h3>
                            <p style={{ margin: 0, fontSize: "14px", color: "#fff" }}>
                                Lat: {searchLat ? searchLat.toFixed(4) : 'N/A'}<br />
                                Lon: {searchLon ? searchLon.toFixed(4) : 'N/A'}
                            </p>
                        </div>

                        {weather.error ? (
                            <div style={{ 
                                backgroundColor: "#fee", 
                                padding: "15px", 
                                borderRadius: "8px",
                                color: "#c33"
                            }}>
                                ❌ Weather data unavailable
                            </div>
                        ) : weather.temp !== undefined ? (
                            <>
                                <div style={{ 
                                    backgroundColor: "rgba(33, 150, 243, 0.2)", 
                                    padding: "20px", 
                                    borderRadius: "8px",
                                    marginBottom: "15px",
                                    textAlign: "center",
                                    border: "1px solid rgba(33, 150, 243, 0.3)"
                                }}>
                                    <div style={{ fontSize: "48px", fontWeight: "bold", color: "#64b5f6" }}>
                                        {weather.temp ? weather.temp : 'N/A'}°C
                                    </div>
                                    <div style={{ fontSize: "18px", color: "#fff", marginTop: "10px" }}>
                                        {weather.description || 'Unknown'}
                                    </div>
                                </div>

                                <div style={{ 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    gap: "12px" 
                                }}>
                                    <div style={{ 
                                        backgroundColor: "rgba(255, 255, 255, 0.1)", 
                                        padding: "15px", 
                                        borderRadius: "8px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        border: "1px solid rgba(255, 255, 255, 0.2)"
                                    }}>
                                        <span style={{ fontSize: "24px" }}>💧</span>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontSize: "12px", color: "#aaa" }}>Humidity</div>
                                            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}>
                                                {weather.humidity !== undefined && weather.humidity !== null ? weather.humidity : 'N/A'}%
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ 
                                        backgroundColor: "rgba(255, 255, 255, 0.1)", 
                                        padding: "15px", 
                                        borderRadius: "8px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        border: "1px solid rgba(255, 255, 255, 0.2)"
                                    }}>
                                        <span style={{ fontSize: "24px" }}>🌬️</span>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontSize: "12px", color: "#aaa" }}>Wind Speed</div>
                                            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}>
                                                {weather.windSpeed !== undefined && weather.windSpeed !== null ? weather.windSpeed : 'N/A'} km/h
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ 
                                backgroundColor: "#fff3cd", 
                                padding: "15px", 
                                borderRadius: "8px",
                                textAlign: "center"
                            }}>
                                ⏳ Loading weather data...
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}