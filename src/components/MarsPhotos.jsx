import React, { useState } from "react";

function MarsPhotos() {
  const [date, setDate] = useState("2015-06-03");
  const [camera, setCamera] = useState("FHAZ");
  const [rover, setRover] = useState("curiosity");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const cameraOptions = ["FHAZ", "RHAZ", "NAVCAM", "MAST"];
  const roverOptions = ["curiosity", "opportunity", "spirit"];

  const mockPhotos = [
    {
      id: 1,
      img_src: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800",
      camera: { full_name: "Front Hazard Avoidance Camera" },
      earth_date: "2015-06-03",
      sol: 1004
    },
    {
      id: 2,
      img_src: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800",
      camera: { full_name: "Navigation Camera" },
      earth_date: "2015-06-03",
      sol: 1004
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Mars Rover Gallery
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl">
            Explore the Red Planet through the eyes of robotic explorers. Filter by rover and date to discover stunning images captured on Mars.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-700">
          <div className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">Rover</label>
                <select 
                  value={rover} 
                  onChange={(e) => setRover(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700/50 border border-gray-600 hover:border-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm sm:text-base"
                >
                  {roverOptions.map(r => (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">Camera</label>
                <select 
                  value={camera} 
                  onChange={(e) => setCamera(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700/50 border border-gray-600 hover:border-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm sm:text-base"
                >
                  {cameraOptions.map(cam => (
                    <option key={cam} value={cam}>{cam}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700/50 border border-gray-600 hover:border-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <button 
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all font-medium text-sm sm:text-base shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <span className="text-lg">{viewMode === "grid" ? "📋" : "🔲"}</span>
                <span>View: {viewMode === "grid" ? "List" : "Grid"}</span>
              </button>
              
              <button 
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700 hover:bg-gray-600 transition-all font-medium text-sm sm:text-base border border-gray-600 hover:border-gray-500"
              >
                🔍 Search
              </button>
            </div>
          </div>
        </div>

        <details className="mb-6 sm:mb-8 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700/50 overflow-hidden">
          <summary className="px-4 sm:px-6 py-3 sm:py-4 cursor-pointer hover:bg-gray-800/50 transition-colors font-semibold text-sm sm:text-base flex items-center gap-2">
            <span className="text-lg">📸</span>
            <span>Camera Information</span>
          </summary>
          <div className="px-4 sm:px-6 py-4 space-y-3 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="font-bold text-orange-400 mb-1">FHAZ</div>
                <div className="text-gray-400">Front Hazard Avoidance Camera - Detects obstacles ahead</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="font-bold text-orange-400 mb-1">RHAZ</div>
                <div className="text-gray-400">Rear Hazard Avoidance Camera - Monitors behind the rover</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="font-bold text-orange-400 mb-1">NAVCAM</div>
                <div className="text-gray-400">Navigation Camera - 3D mapping and route planning</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="font-bold text-orange-400 mb-1">MAST</div>
                <div className="text-gray-400">Mast Camera - High-quality color panoramic images</div>
              </div>
            </div>
          </div>
        </details>

        <details className="mb-6 sm:mb-8 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700/50 overflow-hidden">
          <summary className="px-4 sm:px-6 py-3 sm:py-4 cursor-pointer hover:bg-gray-800/50 transition-colors font-semibold text-sm sm:text-base flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <span>Rover Information</span>
          </summary>
          <div className="px-4 sm:px-6 py-4 space-y-3 text-xs sm:text-sm">
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700/50">
                <div className="font-bold text-orange-400 mb-2 text-sm sm:text-base">Curiosity Rover</div>
                <div className="space-y-1 text-gray-400">
                  <div><span className="text-gray-500">Landed:</span> August 6, 2012</div>
                  <div><span className="text-gray-500">Status:</span> ✅ Active</div>
                  <div><span className="text-gray-500">Location:</span> Gale Crater</div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700/50">
                <div className="font-bold text-orange-400 mb-2 text-sm sm:text-base">Opportunity Rover</div>
                <div className="space-y-1 text-gray-400">
                  <div><span className="text-gray-500">Landed:</span> January 25, 2004</div>
                  <div><span className="text-gray-500">Status:</span> ❌ Inactive (2018)</div>
                  <div><span className="text-gray-500">Mission:</span> 14 years</div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700/50">
                <div className="font-bold text-orange-400 mb-2 text-sm sm:text-base">Spirit Rover</div>
                <div className="space-y-1 text-gray-400">
                  <div><span className="text-gray-500">Landed:</span> January 4, 2004</div>
                  <div><span className="text-gray-500">Status:</span> ❌ Inactive (2010)</div>
                  <div><span className="text-gray-500">Mission:</span> 6 years</div>
                </div>
              </div>
            </div>
          </div>
        </details>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {mockPhotos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-video rounded-lg sm:rounded-xl overflow-hidden cursor-pointer bg-gray-800 hover:ring-2 hover:ring-orange-500 transition-all"
            >
              <img 
                src={photo.img_src} 
                alt={photo.camera.full_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div className="text-xs sm:text-sm font-medium">{photo.camera.full_name}</div>
                  <div className="text-xs text-gray-300 mt-1">Sol {photo.sol}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="max-w-4xl w-full bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedPhoto.img_src} 
                  alt={selectedPhoto.camera.full_name}
                  className="w-full h-auto"
                />
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gray-900/90 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors text-xl sm:text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                <h3 className="text-lg sm:text-xl font-bold">{selectedPhoto.camera.full_name}</h3>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <div>📅 {selectedPhoto.earth_date}</div>
                  <div>☀️ Sol {selectedPhoto.sol}</div>
                  <div>🚀 {rover.toUpperCase()}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarsPhotos;