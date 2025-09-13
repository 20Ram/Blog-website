import React, { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const SearchBar = ({ onSearch, placeholder = "Search posts...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-24 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-20 pr-3 flex items-center"
            title="Clear"
          >
            <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
        <button
          type="submit"
          className="ml-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
