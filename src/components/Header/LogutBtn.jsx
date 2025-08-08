import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
 

function LogutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
     authService.logout()
     .then(() => dispatch(logout()))
     .catch((error) => console.log(error));
     
  }
    return (
    <button 
     onClick={logoutHandler}
    className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors' >
      Logout</button>
  )
}

export default LogutBtn