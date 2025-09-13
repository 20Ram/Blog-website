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
import { useToast } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import LoadingSpinner from './components/LoadingSpinner';
import { useDarkMode } from './hooks/useDarkMode';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { toasts, removeToast } = useToast();
  const { isDarkMode } = useDarkMode();

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

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' 
          : 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400'
      }`}>
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className={`mt-4 text-lg transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Loading your blog experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full min-h-screen flex flex-col transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100' 
        : 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-900'
    }`}>
      <Header />

      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>

      <Footer />
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
