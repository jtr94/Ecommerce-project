import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export const CheckoutPage = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary  ] = useState(null);
  useEffect(() => {
    const fetchCheckoutInfo = async()=>{
      const deliveryResponse= await axios("http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime")
      setDeliveryOptions(deliveryResponse.data)
       
      const PaymentSummaryResponse= await axios("http://localhost:3000/api/payment-summary")
      setPaymentSummary(PaymentSummaryResponse.data)  
    }
    fetchCheckoutInfo();    
  }, []);
  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>
          <PaymentSummary paymentSummary ={paymentSummary}/>
        </div>
      </div>
    </>
  );
};
