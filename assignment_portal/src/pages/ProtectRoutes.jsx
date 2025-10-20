import React, { useContext } from 'react'
import { UserInfo } from '../components/UseAuth'
import { Navigate } from 'react-router-dom'

const ProtectRoutes = ({children,allowedRole}) => {

    const {user} =useContext(UserInfo)


if( !user.role){
    return <Navigate to='/' replace/>
}
if(allowedRole && user.role !==allowedRole){
    return <Navigate to='/' replace/>
}

 return children
}

export default ProtectRoutes