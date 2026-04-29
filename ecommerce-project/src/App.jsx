import { useEffect, useState } from 'react'
import axios from 'axios'
import {HomePage} from './pages/HomePage'
import { Routes, Route } from 'react-router'
import {CheckoutPage} from './pages/checkout/CheckoutPage'
import { Orders } from './pages/Orders'
import { Tracking } from './pages/Tracking'
import { NotFound } from './pages/not-found/NotFound'

function App() {  
  const [cart, setCart] = useState([])
  useEffect(()=>{
  axios("http://localhost:3000/api/cart-items?expand=product").then((response) =>
    setCart(response.data),
  )}, [])

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>}/> 
      <Route path='checkout' element={<CheckoutPage cart={cart}/>}/>
      <Route path='orders' element={<Orders/>}/> 
      <Route path='tracking' element={<Tracking/>}/>  
      <Route path='*' element={<NotFound/>}/> 
    </Routes>
    
  )
}

export default App
