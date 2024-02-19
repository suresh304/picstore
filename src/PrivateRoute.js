import React, { useContext } from 'react'
import { authContext } from './context/authContext'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children}) => {
    const {user,setUser} = useContext(authContext)
    console.log(user,"uuuuuuuuuuuuuuusssssssssssssssssssssssseeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrr")
  return user?(
    <div>
        {children}
    </div>):<Navigate to="/"/>
}

export default PrivateRoute