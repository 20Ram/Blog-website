import React from 'react'
import { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication = true}) {
 const [loader, setLoader] = useState(true)
 const navigate = useNavigate()
 const authStatus = useSelector(state => state.auth.status)

 useEffect(() => {
  // TODO make it more esay to understand
  // if(authStatus === true){
  //   navigate('/')
  // }else if(authStatus === false){
  //   navigate('/login')
  // }
if(authentication && authStatus !== authentication ){
  navigate('/login')
}else if(!authentication && authStatus !== authentication){
  navigate('/')
}
 setLoader(false);
 }, [authStatus,navigate, authentication])

  return  loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected