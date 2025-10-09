import React from 'react'
import { Outlet } from 'react-router-dom'
import APOD from './components/APOD'
import Header from './components/Header'
function Layout() {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default Layout