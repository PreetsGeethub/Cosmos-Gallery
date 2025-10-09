import React, { useState } from "react";
import useMarsPhotos from "../hooks/useMarsPhoto";

function MarsPhotos() {
  const [date, setDate] = useState("2015-06-03");
  const [camera, setCamera] = useState("FHAZ");
  const [rover, setRover] = useState("curiosity");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cameraOptions = ["FHAZ", "RHAZ", "NAVCAM", "MAST"];
  const roverOptions = ["curiosity", "opportunity", "spirit"];

  const { data, loading, message } = useMarsPhotos(
    import.meta.env.VITE_NASA_API_KEY,
    rover,
    date,
    camera
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Nav */}
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2 text-xl font-bold">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 48 48">
                  <path d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" />
                </svg>
                <span className="hidden sm:inline">Cosmos Explorer</span>
              </a>

              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Home</a>
                <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">APOD</a>
                <a href="#" className="text-sm font-bold text-blue-600">Mars Rovers</a>
                <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Gallery</a>
              </nav>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">


              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors hidden sm:block">
                <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                </svg>
              </button>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 flex flex-col gap-3 border-t border-gray-200 dark:border-gray-800">
              <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Home</a>
              <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">APOD</a>
              <a href="#" className="text-sm font-bold text-blue-600 py-2 px-3 rounded bg-blue-50 dark:bg-blue-900/20">Mars Rovers</a>
              <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Gallery</a>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Mars Rover Image Gallery</h1>
            <section className="text-gray-600 dark:text-gray-300 mt-6 space-y-4">
              <p className="text-lg font-medium">
                Explore the Red Planet through the eyes of robotic explorers. Filter by rover and date to discover stunning images captured on Mars.
              </p>

              <details className="border border-gray-500/30 rounded-lg p-3 bg-gray-900/50">
                <summary className="cursor-pointer text-white font-semibold text-lg">
                  🚀 Curiosity Rover
                </summary>
                <div className="mt-2 text-gray-400 leading-relaxed">
                  <p><strong>Mission:</strong> Mars Science Laboratory (MSL)</p>
                  <p><strong>Landing Date:</strong> August 6, 2012</p>
                  <p><strong>Status:</strong> ✅ Active (still exploring Gale Crater)</p>
                  <p><strong>Primary Goal:</strong> Study Mars’ habitability — whether Mars ever had environmental conditions favorable for microbial life.</p>
                  <p><strong>Power Source:</strong> Nuclear (RTG – Radioisotope Thermoelectric Generator)</p>
                </div>
              </details>

              <details className="border border-gray-500/30 rounded-lg p-3 bg-gray-900/50">
                <summary className="cursor-pointer text-white font-semibold text-lg">
                  🤖 Opportunity Rover
                </summary>
                <div className="mt-2 text-gray-400 leading-relaxed">
                  <p><strong>Mission:</strong> Mars Exploration Rover – B (MER-B)</p>
                  <p><strong>Landing Date:</strong> January 25, 2004</p>
                  <p><strong>End of Mission:</strong> June 10, 2018 (lost contact after global dust storm)</p>
                  <p><strong>Status:</strong> ❌ Inactive</p>
                  <p><strong>Primary Goal:</strong> Search for signs of past water activity and study Martian geology.</p>
                </div>
              </details>

              <details className="border border-gray-500/30 rounded-lg p-3 bg-gray-900/50">
                <summary className="cursor-pointer text-white font-semibold text-lg">
                  🔧 Spirit Rover
                </summary>
                <div className="mt-2 text-gray-400 leading-relaxed">
                  <p><strong>Mission:</strong> Mars Exploration Rover – A (MER-A)</p>
                  <p><strong>Landing Date:</strong> January 4, 2004</p>
                  <p><strong>End of Mission:</strong> March 22, 2010 (stuck in sand, lost communication)</p>
                  <p><strong>Status:</strong> ❌ Inactive</p>
                  <p><strong>Primary Goal:</strong> Geological study of Martian rocks and soil for clues about water history.</p>
                  <p><strong>Power Source:</strong> Solar</p>
                </div>
              </details>
            </section>

            <div>
              <h4 className="text-l sm:text-l font-bold mb-2">Choose a rover camera to view Mars through different perspectives</h4>
              <details className="margin: 1rem 0; border: 1px solid #444; border-radius: 8px; padding: 0.5rem; background: #111; color: #eee;">
                <summary className="cursor: pointer; font-weight: bold; font-size: 1.1rem;">
                  📸 Camera Information
                </summary>

                <table className="width: 100%; border-collapse: collapse; margin-top: 0.5rem; text-align: left;">
                  <thead>
                    <tr className="border-bottom: 1px solid #555;">
                      <th className="padding: 8px;">Camera</th>
                      <th className="padding: 8px;">Meaning</th>
                      <th className="padding: 8px;">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="padding: 8px;">FHAZ</td>
                      <td className="padding: 8px;">Front Hazard Avoidance Camera</td>
                      <td className="padding: 8px;">Detects obstacles in front of rover</td>
                    </tr>
                    <tr>
                      <td className="padding: 8px;">RHAZ</td>
                      <td className="padding: 8px;">Rear Hazard Avoidance Camera</td>
                      <td className="padding: 8px;">Helps avoid hazards while reversing</td>
                    </tr>
                    <tr>
                      <td className="padding: 8px;">NAVCAM</td>
                      <td className="padding: 8px;">Navigation Camera</td>
                      <td className="padding: 8px;">3D mapping and route planning</td>
                    </tr>
                    <tr>
                      <td className="padding: 8px;">MAST</td>
                      <td className="padding: 8px;">Mast Camera</td>
                      <td className="padding: 8px;">Captures color and panoramic images</td>
                    </tr>
                  </tbody>
                </table>
              </details>




            </div>
          </div>

          {/* Filters Bar */}
          <div className="sticky top-16 z-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">

                </div>

              </div>

              <div className="flex gap-2 sm:gap-4 flex-wrap">
                <select value={rover} onChange={(e) => setRover(e.target.value)} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm font-medium border-transparent focus:ring-blue-600">
                  {roverOptions.map(r => (
                    <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                  ))}
                </select>

                <select value={camera} onChange={(e) => setCamera(e.target.value)} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm font-medium border-transparent focus:ring-blue-600">
                  {cameraOptions.map(cam => (
                    <option key={cam} value={cam}>{cam}</option>
                  ))}
                </select>

                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm font-medium border-transparent focus:ring-blue-600" />

                <button onClick={() => setViewMode(viewMode === "grid" ? "timeline" : "grid")} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap">
                  <span>{viewMode === "grid" ? "📊" : "🔲"}</span>
                  <span className="hidden sm:inline">{viewMode === "grid" ? "Timeline" : "Grid"}</span>
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <p className="text-lg text-gray-600 dark:text-gray-400">Loading Mars photos...</p>
            </div>
          )}

          {message && !loading && (
            <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 rounded-lg p-4 mb-8">
              <p className="text-yellow-800 dark:text-yellow-200">{message}</p>
            </div>
          )}

          {/* Grid View */}
          {!loading && viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.length > 0 ? (
                data.slice(0, 12).map((photo) => (
                  <div key={photo.id} className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
                    <img src={photo.img_src} alt={photo.camera.full_name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-20">
                  <p className="text-gray-600 dark:text-gray-400">No photos found for this selection.</p>
                </div>
              )}
            </div>
          )}

          {/* Timeline View */}
          {!loading && viewMode === "timeline" && data.length > 0 && (
            <div className="relative max-w-4xl mx-auto py-8">
              <div className="absolute h-full border-l-2 border-gray-300 dark:border-gray-700 left-1/2 -translate-x-1/2"></div>
              <div className="space-y-12">
                {data.slice(0, 6).map((photo, index) => (
                  <div key={photo.id} className={`flex items-center justify-between w-full mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-2">{photo.camera.full_name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{photo.earth_date}</p>
                        <p className="text-gray-700 dark:text-gray-300">Sol {photo.sol} - {rover.toUpperCase()} Rover</p>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-col items-center w-16 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">📷</div>
                    </div>

                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
                        <img src={photo.img_src} alt={photo.camera.full_name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && data.length > 0 && (
            <div className="mt-8 text-center">
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                Load More
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.img_src} alt={selectedPhoto.camera.full_name} className="w-full h-auto rounded-lg mb-4" />
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">{selectedPhoto.camera.full_name}</h3>
              <p className="text-gray-300">Date: {selectedPhoto.earth_date} | Sol: {selectedPhoto.sol}</p>
              <p className="text-gray-300">Rover: {rover.toUpperCase()}</p>
            </div>
            <button onClick={() => setSelectedPhoto(null)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-gray-400">
            <div className="text-sm mb-4 md:mb-0">
              © 2024 Cosmos Explorer. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm mb-4 md:mb-0">
              <a href="#" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-600 transition-colors">🐦</a>
              <a href="#" className="hover:text-blue-600 transition-colors">📷</a>
              <a href="#" className="hover:text-blue-600 transition-colors">👍</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MarsPhotos;