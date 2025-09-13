// import React from 'react'
// import { useState} from 'react'
// import authService  from '../appwrite/auth'
// import { Link, useNavigate } from 'react-router-dom'
// import { login } from '../store/authSlice'
// import { Button, Input, Logo} from './index.js'
// import { useDispatch } from 'react-redux'
// import { useForm } from 'react-hook-form'


// function Signup() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit} = useForm();
//   const [error , setError] = useState('');

//   const create = async (data) => {
//     setError('')
//         try {
//          const userData = await authService.createAccount(data);
//          if (userData) {
//          const userData = await authService.getCurrentUser()
//          if (userData) dispatch(login(userData));
//          navigate('/')
//          }
//         } catch (error) {
//           setError(error.message);
//         }
//   }
//   return (
//     <div className='flex items-center justify-center'>
//       <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//         <div className='mb-2 flex justify-center'>
//           <span className='inline-block w-full max-w-[100px]'> <Logo width='100%'/></span>
//         </div>
//         <h2 className=' text-center text-2xl font-bold leading-tight'>Sing Up to create account</h2>
//       <p className='mt-2 text-center text-base  text-black/60'>Already have an account?&apos;
//       <Link 
//       to='/login'
//       className='font-medium text-primary transition-all drop-shadow-blue-200 hover:underline' >
//         Sign In
//       </Link>
//       </p>
//       {
//         error && <p className='text-red-500 mt-8 text-center'>{error}</p>
//       }
//       <form onSubmit={handleSubmit(create)} >
//         <div className='space-y-5'>
//           <Input
//            label='Full Name:'
//            placeholder ='Enter your Full Name'
//            type ='text'
//            {...register('name',{
//             required: true
//            })}
//           />
//           <Input 
//             label='Email:'
//             placeholder='Enter your email'
//             type ='email'
//             {...register('email',{
//               required: true,
//               validate:{
//                 matchPatern: (value) => {
//                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address' 
//               }}
//             })}
//             />
//           <Input 
//           label='Password:'
//           placeholder='Enter your password'
//           type='password'
//           {...register('password', { required: true })}
//           />
//           <Button 
//           type='submit'
//           className='w-full'>
//           Create Account
//           </Button>
//         </div>
//       </form>
//       </div>
//     </div>
//   )
// }

// export default Signup


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useToast } from '../hooks/useToast'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { error: showError, success } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const create = async (data) => {
    setIsLoading(true)
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          dispatch(login(currentUser))
          success('Account created successfully! Welcome to our blog platform.')
          navigate('/')
        } else {
          showError('Account created but failed to log in. Please try logging in manually.')
        }
      } else {
        showError('Failed to create account. Please try again.')
      }
    } catch (error) {
      console.error('Signup error:', error)
      showError(error.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
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
        <h2 className="text-center text-3xl font-bold text-[#ff6f61] mb-2 drop-shadow-md">
          Sign Up to Create Account
        </h2>
        <p className="text-center text-base text-black/60">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-[#ff6f61] hover:underline transition-all duration-200"
          >
            Sign In
          </Link>
        </p>

        {errors.name && <p className="text-red-600 mt-2 text-sm">{errors.name.message}</p>}
        {errors.email && <p className="text-red-600 mt-2 text-sm">{errors.email.message}</p>}
        {errors.password && <p className="text-red-600 mt-2 text-sm">{errors.password.message}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              type="text"
              {...register('name', {
                required: true,
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address',
                },
              })}
            />
            <Input
              label="Password:"
              placeholder="Enter your password"
              type="password"
              {...register('password', {
                required: true,
              })}
            />
            <Button 
              type="submit" 
              className="w-full hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
