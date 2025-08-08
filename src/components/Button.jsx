// import React from 'react'

// function Button({
//   children,
//   type = 'button',
//   bgColor = 'bg-blue-600',
//   textColor = 'text-white',
//   className = '',
//   ...props
// }) {
//   return (
//      <button
//      className={`px-4 py-2 rounded-lg ${className} 
//      ${textColor} ${bgColor}`} {...props}
//      >{children}
//      </button>
//   )
// }

// export default Button


import React from 'react'

const bgColorMap = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  gray: 'bg-gray-600',
  yellow: 'bg-yellow-500',
  transparent: 'bg-transparent',
}

const textColorMap = {
  white: 'text-white',
  black: 'text-black',
  gray: 'text-gray-800',
}

function Button({
  children,
  type = 'button',
  bgColor = 'blue',
  textColor = 'white',
  className = '',
  ...props
}) {
  const bg = bgColorMap[bgColor] || bgColorMap.blue
  const text = textColorMap[textColor] || textColorMap.white

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out hover:opacity-90 ${bg} ${text} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
