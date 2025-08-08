// import React, {useState} from 'react'
// import {Link, useNavigate} from 'react-router-dom'
// import { login as authLogin } from '../store/authSlice'
// import {Button, Input, Logo} from "./index"
// import {useDispatch} from "react-redux"
// import authService from "../appwrite/auth"
// import {useForm} from "react-hook-form"

// function Login() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const {register, handleSubmit} = useForm()
//     const [error, setError] = useState("")

//     const login = async(data) => {
//         setError("")
//         try {
//             const session = await authService.login(data)
//             if (session) {
//                 const userData = await authService.getCurrentUser()
//                 if(userData) dispatch(authLogin(userData));
//                 navigate("/")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }
// return (
//   <div
//   className='flex items-center justify-center w-full'
//   >
//       <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//       <div className="mb-2 flex justify-center">
//                   <span className="inline-block w-full max-w-[100px]">
//                       <Logo width="100%" />
//                   </span>
//       </div>
//       <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
//       <p className="mt-2 text-center text-base text-black/60">
//                   Don&apos;t have any account?&nbsp;
//                   <Link
//                       to="/signup"
//                       className="font-medium text-primary transition-all duration-200 hover:underline"
//                   >
//                       Sign Up
//                   </Link>
//       </p>
//       {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//       <form onSubmit={handleSubmit(login)} className='mt-8'>
//           <div className='space-y-5'>
//               <Input
//               label="Email: "
//               placeholder="Enter your email"
//               type="email"
//               {...register("email", {
//                   required: true,
//                   validate: {
//                       matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                       "Email address must be a valid address",
//                   }
//               })}
//               />
//               <Input
//               label="Password: "
//               type="password"
//               placeholder="Enter your password"
//               {...register("password", {
//                   required: true,
//               })}
//               />
//               <Button
//               type="submit"
//               className="w-full"
//               >Sign in</Button>
//           </div>
//       </form>
//       </div>
//   </div>
// )
// }

// export default Login


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const backgroundStyle = {
    background: 'linear-gradient(to right, #fdeff9, #ecf0f3)',
    minHeight: '100vh',
  }

  return (
    <div style={backgroundStyle} className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-8 sm:p-10 rounded-2xl bg-white/30 shadow-xl backdrop-blur-md mt-10 mb-10 animate-fade-in transform transition duration-300 hover:scale-[1.01] border border-white/40">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-[#ff6f61] drop-shadow-md">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-[#ff6f61] transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
              })}
            />
            <Button type="submit" className="w-full hover:scale-[1.02] transition">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
