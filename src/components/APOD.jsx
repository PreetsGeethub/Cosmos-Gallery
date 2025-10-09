import React, { useState } from "react";
import useAPOD from "../hooks/useAPOD";
import { Link, NavLink } from 'react-router-dom'
import Header from "./Header";
function APOD() {
  const [date, setDate] = useState("2025-09-30");
  
  const apod = useAPOD("LyXdwyNfic3xzFdzn9xvk862BGoZGQDemL9qeKFf", date);

  // Helper function to get random date
  const getRandomDate = (start = new Date(1995, 5, 16), end = new Date()) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split("T")[0];
  };

  const randomImg = () => {
    setDate(getRandomDate());
  };

  const handlePreviousDay = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    setDate(currentDate.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const currentDate = new Date(date);
    const today = new Date();
    if (currentDate < today) {
      currentDate.setDate(currentDate.getDate() + 1);
      setDate(currentDate.toISOString().split("T")[0]);
    }
  };

  if (!apod || !apod.url) {
    return (
      <Header />
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-900 text-gray-200">
      {/* Header */}
      

      {/* Main Content */}
      <main className="flex flex-1 justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="w-full max-w-4xl">

          {/* Page Title */}
          <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Astronomy Picture of the Day
          </h1>

          {/* Image Container */}
          <div className="mb-4 sm:mb-6 overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
            {apod.media_type === "video" ? (
              <iframe
                src={apod.url}
                title={apod.title}
                className="aspect-video sm:aspect-[3/2] w-full"
                allowFullScreen
              />
            ) : (
              <img
                src={apod.url}
                alt={apod.title}
                className="aspect-video sm:aspect-[3/2] w-full object-cover"
              />
            )}
          </div>

          {/* Description Card */}
          <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{apod.title}</h2>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300 mb-3 sm:mb-4">{apod.explanation}</p>
            <p className="text-xs sm:text-sm text-gray-400">
              📅 {date}
            </p>
            {apod.copyright && (
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                © {apod.copyright}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Previous Button */}
            <button
              onClick={handlePreviousDay}
              className="flex items-center justify-center gap-2 rounded bg-blue-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 order-2 sm:order-1"
            >
              <span>←</span>
              <span>Previous</span>
            </button>

            {/* Date Picker & Random Button */}
            <div className="flex items-center gap-2 sm:gap-4 order-1 sm:order-2">
              <input
                type="date"
                value={date}
                max={new Date().toISOString().split("T")[0]}
                min="1995-06-16"
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 sm:flex-none rounded border-gray-600 bg-gray-700 text-white text-sm px-3 py-2 sm:py-2.5 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={randomImg}
                className="flex items-center justify-center gap-2 rounded bg-blue-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              >
                <span>🎲</span>
                <span className="hidden xs:inline">Random</span>
              </button>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextDay}
              disabled={date >= new Date().toISOString().split("T")[0]}
              className="flex items-center justify-center gap-2 rounded bg-blue-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed order-3"
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default APOD;