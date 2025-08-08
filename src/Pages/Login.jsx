// import React from 'react'
// import {Login as LoginComponent } from '../components'
// function Login() {
//   return (
//     <div className='py-8'>
//       <LoginComponent />
//     </div>
//   )
// }

// export default Login


import React from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
  const backgroundStyle = {
    background: 'linear-gradient(to right, #fdeff9, #ecf0f3)',
    minHeight: '100vh',
  }

  return (
    <div style={backgroundStyle} className="flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white/30 shadow-xl backdrop-blur-md animate-fade-in transform transition duration-300 hover:scale-[1.01] mt-10 mb-10">
        <h2 className="text-3xl font-bold text-center text-[#ff6f61] mb-6 drop-shadow-md">
          Welcome Back 🌸
        </h2>
        <LoginComponent />
      </div>
    </div>
  )
}

export default Login
