// import React from 'react'

// function Logo({width = '100px'}) {
//   return (
//     <div>Logo</div>
//   )
// }

// export default Logo


import React from 'react'
import logo from '../../assets/rn-logo.png'

function Logo({ width = '50px' }) {
  return (
    <img
      src={logo} // replace with your logo path
      alt="Logo"
      style={{ width } }
       className="
        h-auto 
        rounded-full 
        shadow-lg 
        border-2 border-gray-200
        hover:scale-105 
        hover:shadow-xl 
        transition-all 
        duration-300 
        ease-in-out
        bg-white
        p-1
      "
    />
  )
}

export default Logo
