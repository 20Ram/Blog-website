import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useDarkMode } from '../hooks/useDarkMode'

const DarkModeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
        isDarkMode 
          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
          : 'bg-gray-800 text-white hover:bg-gray-700'
      } ${className}`}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  )
}

export default DarkModeToggle
