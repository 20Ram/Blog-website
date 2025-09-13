import React from 'react'
import { Logo, LogutBtn, Container } from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DarkModeToggle from '../DarkModeToggle'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className='py-4 bg-gray-800 dark:bg-gray-900 shadow-md text-white transition-colors duration-200'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Logo Section */}
          <div className='flex items-center space-x-2'>
            <Link to='/'>
              <Logo width='50px' />
            </Link>
            <span className='text-lg font-semibold hidden sm:block'>RN Blog</span>
          </div>

          {/* Navigation Items */}
          <div className='flex items-center space-x-4'>
            <ul className='flex items-center space-x-4'>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className='px-4 py-2 hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors rounded-full'
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </ul>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Logout Button */}
            {authStatus && (
              <LogutBtn />
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
