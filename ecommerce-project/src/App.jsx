import { useState } from 'react'
import {HomePage} from './pages/HomePage'
import { Routes, Route } from 'react-router'
import {CheckoutPage} from './pages/CheckoutPage'
import { Orders } from './pages/Orders'
import { Tracking } from './pages/Tracking'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage/>}/> 
      <Route path='checkout' element={<CheckoutPage/>}/>
      <Route path='orders' element={<Orders/>}/> 
      <Route path='tracking' element={<Tracking/>}/>  
    </Routes>
    
  )
}

export default App
