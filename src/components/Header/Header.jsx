// import React from 'react'
// import { Logo , LogutBtn, Container } from '../index.js'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// function Header() {
//   const authStatus = useSelector((state) => state.auth.status)
//   const navigate = useNavigate();

//   const navItem =  [
//     {
//       name: 'Home',
//       slug: '/',
//       active: true
//     },
//     {
//       name:'Login',
//       slug:'/login',
//       active: !authStatus,
//     },
//     {
//       name:'Signup',
//       slug:'/signup',
//       active:!authStatus,
//     },
//     {
//       name:'All Posts',
//       slug:'/all-posts',
//       active:authStatus,
//     },
//     {
//       name:'Add Post',
//       slug:'/add-post',
//       active:authStatus,
//     },
//   ]

//   return (
//      <header className='py-3 shadow bg-gray-500'>
//       <Container >
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//             <Logo width='70px' />

//             </Link>
//           </div>
//           <ul className='flex ml-auto'>
//             {navItem.map((item) => 
//             item.active ? (
//             <li key={item.name}>
//               <button
//               onClick={() => navigate(item.slug)}
//               className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//               >{item.name}</button>
//             </li>) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//      </header>
//   )
// }

// export default Header


import React from 'react'
import { Logo, LogutBtn, Container } from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
    <header className='py-4 bg-gray-800 shadow-md text-white'>
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
          <ul className='flex items-center space-x-4'>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='px-4 py-2 hover:bg-blue-500 transition-colors rounded-full'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
