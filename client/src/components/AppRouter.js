import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../Routes'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { INDEX_ROUTE } from '../utils/Const'

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    if (user.isAuth === true && (window.location.pathname === "/login" || window.location.pathname === "/registration")){
      return <Navigate to={INDEX_ROUTE}></Navigate>
    }else {
      
    }
  return (
  
    <Routes>
      {user.isAuth && authRoutes.map(({path, Component}) => 
        <Route key={path} path = {path} Component={Component} exact/>      
      )}
      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path = {path} Component={Component} exact/>      
      )}
      <Route path="*" element={<Navigate to = "/"/>}/>
    </Routes>
  )
})

export default AppRouter