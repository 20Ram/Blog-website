import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getToastStyles = () => {
    const baseStyles = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out'
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-500 text-white`
      case 'error':
        return `${baseStyles} bg-red-500 text-white`
      case 'warning':
        return `${baseStyles} bg-yellow-500 text-black`
      case 'info':
      default:
        return `${baseStyles} bg-blue-500 text-white`
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
      default:
        return 'ℹ️'
    }
  }

  return createPortal(
    <div
      className={`${getToastStyles()} ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{getIcon()}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="ml-2 text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  )
}

export default Toast
