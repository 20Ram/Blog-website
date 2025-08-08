//   import { useDispatch } from 'react-redux'
//   import { useEffect, useState } from 'react'
//   import  authService from './appwrite/auth.js';
//   import { Header , Footer } from './components/index.js';
//   // import authSlice from "./store/authSlice.js";
//   import { login, logout } from './store/authSlice.js';
//   import './App.css'
//   import { Outlet } from 'react-router-dom';
 

// function App() {
//   const [loading, setloading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//   authService.getCurrentUser()
//   .then((userData) => {
//   if (userData){
//   dispatch(login({ userData }));
//   }else{
//   dispatch(logout());
//   }
//   })
//   .catch((error) => {
//   console.error('Error fetching user data:', error);
//   })
//   .finally(() => setloading(false))
//   }, [])
   
//   return !loading ? (
//   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
//   <div className='w-full block'>
//   <Header />
//   <main>
//   {/* TODO  <Outlet /> */}
//   <Outlet />
//   </main>
//   <Footer />
//   </div>
//   </div>
//   ) : null
//   }

// export default App


import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import authService from './appwrite/auth.js';
import { Header, Footer } from './components/index.js';
import { login, logout } from './store/authSlice.js';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null; // Can replace with a spinner component

  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-900">
      <Header />

      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
