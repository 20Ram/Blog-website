import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useToast } from '../hooks/useToast'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { error: showError, success } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (data) => {
    setIsLoading(true)
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
          success('Welcome back! You have been logged in successfully.')
          navigate('/')
        } else {
          showError('Failed to get user data. Please try again.')
        }
      } else {
        showError('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      showError(error.message || 'Login failed. Please try again.')
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

        {errors.email && <p className="text-red-600 mt-2 text-sm">{errors.email.message}</p>}
        {errors.password && <p className="text-red-600 mt-2 text-sm">{errors.password.message}</p>}

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
            <Button 
              type="submit" 
              className="w-full hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
