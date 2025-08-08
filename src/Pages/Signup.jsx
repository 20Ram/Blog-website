// import React from 'react'
// import { Signup as SignupComponent } from '../components/index.js'

// function Signup() {
//   return (
//     <div className='py-8'> 
//      <SignupComponent />
//     </div>
//   )
// }

// export default Signup

import React from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {
  const backgroundStyle = {
    background: 'linear-gradient(to right, #fdeff9, #ecf0f3)',
    minHeight: '100vh',
  }

  return (
    <div style={backgroundStyle} className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-8 sm:p-10 rounded-2xl bg-white/30 shadow-xl backdrop-blur-md mt-10 mb-10 animate-fade-in transform transition duration-300 hover:scale-[1.01] border border-white/40">
        <h2 className="text-center text-3xl font-bold text-[#ff6f61] mb-6 drop-shadow-md">
          Create your account ✨
        </h2>
        <SignupComponent />
      </div>
    </div>
  )
}

export default Signup
