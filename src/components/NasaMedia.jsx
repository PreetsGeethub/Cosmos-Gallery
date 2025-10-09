import React, { useState } from 'react';
import useNasaMedia from '../hooks/useNasaMedia';

function NasaMedia() {
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [mediaType, setMediaType] = useState("All");
    const [searchMediaType, setSearchMediaType] = useState("image");
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [viewMode, setViewMode] = useState("grid");
    const [isSearching, setIsSearching] = useState(false);
    // Pass mediaType to hook only if not "All"
    const { data, errorMsg, loading } = useNasaMedia(
        searchKeyword,
        searchMediaType !== "All" ? searchMediaType.toLowerCase() : undefined
    );

    const mediaOptions = ["image", "video", "audio", "All"];
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchKeyword(keyword);
        setIsSearching(true);
        setSearchMediaType(mediaType);
        setTimeout(() => setIsSearching(false), 600);
    };
    return (
        <div className="p-4">
             <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-30 mt-32 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    NASA Media Explorer
                </h1>
                <p className="text-gray-600 text-lg max-w-6xl mx-auto ml-20">
                    Explore NASA's vast collection of space imagery, videos, and audio recordings. 
                    Search by keywords, filter by media type, and switch between grid and timeline views 
                    to discover the wonders of space exploration.
                </p>
                <div className="mt-40 flex flex-wrap justify-center gap-3 text-sm text-gray-500 mb-11 ">
                    <span className="flex items-center gap-1">
                        🔍 <span>Search content</span>
                    </span>
                    <span className="flex items-center gap-1">
                        🎬 <span>Filter by type</span>
                    </span>
                    <span className="flex items-center gap-1">
                        📅 <span>View timeline</span>
                    </span>
                    <span className="flex items-center gap-1">
                        🖼️ <span>Click to expand</span>
                    </span>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className='mt-32 mb-8'>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search media"
                />
                <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                    {mediaOptions.map((m) => (
                        <option className='bg-gray-600 ' key={m} value={m}>
                            {m.charAt(0).toUpperCase() + m.slice(1)} {/* Capitalize first letter */}
                        </option>
                    ))}
                </select>
                <button className='ml-5' type="submit">Search</button>
            </form>

            {loading && (
                <p className="text-gray-600">Loading Media...</p>
            )}

            {errorMsg && !loading && (
                <p className="text-red-600">{errorMsg}</p>
            )}
             {isSearching && <p className="text-gray-500">🔍 Searching...</p>}
            {!loading && data.length > 0 && (
                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : ""}>
                    {data.map((item, index) => {
                        const mediaData = item.data[0];
                        const mediaTypeItem = mediaData.media_type;
                        const url = item.links?.[0]?.href;

                        if (!url) return null;

                        // Wrap each media in a div with onClick
                        return (
                            <div key={index} onClick={() => setSelectedPhoto(item)} className="cursor-pointer">
                                {mediaTypeItem === "image" && (
                                    <img src={url} alt={mediaData.title} className="w-full h-auto rounded" />
                                )}
                                {mediaTypeItem === "video" && (
                                    <iframe src={url} title={mediaData.title} className="w-full h-64 rounded" />
                                )}
                                {mediaTypeItem === "audio" && (
                                    <audio controls src={url} className="w-full" />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {!loading && data.length === 0 && (
                <p className="text-gray-600">No media found for this selection.</p>
            )}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div
                        className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-900 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                        >
                            ✕
                        </button>

                        {selectedPhoto.data[0].media_type === "image" && (
                            <img
                                src={selectedPhoto.links[0].href}
                                alt={selectedPhoto.data[0].title}
                                className="w-full h-auto rounded"
                            />
                        )}
                        {selectedPhoto.data[0].media_type === "video" && (
                            <iframe
                                src={selectedPhoto.links[0].href}
                                title={selectedPhoto.data[0].title}
                                className="w-full h-96 rounded"
                            />
                        )}
                        {selectedPhoto.data[0].media_type === "audio" && (
                            <audio controls src={selectedPhoto.links[0].href} className="w-full" />
                        )}

                        <h2 className="text-xl font-bold mt-4">{selectedPhoto.data[0].title}</h2>
                        <p className="mt-2 text-gray-700">{selectedPhoto.data[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NasaMedia;
