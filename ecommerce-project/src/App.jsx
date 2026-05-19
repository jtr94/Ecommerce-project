import { useEffect, useState } from 'react'
import axios from 'axios'
import {HomePage} from './pages/home/HomePage'
import { Routes, Route } from 'react-router'
import {CheckoutPage} from './pages/checkout/CheckoutPage'
import { Orders } from './pages/orders/Orders'
import { Tracking } from './pages/tracking/Tracking'
import { NotFound } from './pages/not-found/NotFound'

function App() {  
  const [cart, setCart] = useState([])
  const updateCart = async() =>{
      const response = await axios("http://localhost:3000/api/cart-items?expand=product")
      setCart(response.data)
  }
  useEffect(()=>{
      updateCart()
  } , [])

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} updateCart={updateCart}/>}/> 
      <Route path='checkout' element={<CheckoutPage cart={cart} updateCart={updateCart}/>}/>
      <Route path='orders' element={<Orders cart={cart} updateCart={updateCart}/>}/> 
      <Route path='tracking/:orderId/:productId' element={<Tracking cart={cart}/>}/>  
      <Route path='*' element={<NotFound/>}/> 
    </Routes>
    
  )
}

export default App
