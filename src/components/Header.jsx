import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-blue-500/20 px-4 sm:px-6 md:px-10 py-3 sm:py-4 bg-gray-900 text-white relative">
      {/* Logo + Title */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-lg sm:text-xl">
          🌌
        </div>
        <h2 className="text-base sm:text-xl font-bold">Cosmos Gallery</h2>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive ? 'text-blue-400 font-bold' : 'hover:text-blue-400'
            }`
          }
        >
          APOD
        </NavLink>
        <NavLink
          to="/mars"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive ? 'text-blue-400 font-bold' : 'hover:text-blue-400'
            }`
          }
        >
          Mars
        </NavLink>
        <NavLink
          to="/media"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive ? 'text-blue-400 font-bold' : 'hover:text-blue-400'
            }`
          }
        >
          media
        </NavLink>
        <NavLink
          to="/gibs"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive ? 'text-blue-400 font-bold' : 'hover:text-blue-400'
            }`
          }
        >
          Gibs
        </NavLink>
      </nav>

      {/* Right Section (Buttons + Avatar) */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <button className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors text-lg sm:text-xl">
          ⚙️
        </button>
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-gray-800 border-b border-blue-500/20 py-4 px-4 flex flex-col gap-3 z-50">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium hover:text-blue-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
          >
            APOD
          </NavLink>
          <NavLink
            to="/mars"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium hover:text-blue-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
          >
            Mars
          </NavLink>
          <NavLink
            to="/media"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium hover:text-blue-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
          >
            Media
          </NavLink>
          <NavLink
            to="/gibs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium hover:text-blue-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
          >
            Gibs
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
