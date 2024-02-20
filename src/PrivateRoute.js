import React, { useContext } from 'react'
import { authContext } from './context/authContext'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute = ({children}) => {
    const user_rdx = useSelector(state=>state.user)


  return user_rdx?(
    <div>
        {children}
    </div>):<Navigate to="/"/>
}

export default PrivateRoute