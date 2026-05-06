import {React, useState, useEffect }from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useParams, Link } from "react-router";
import './Tracking.css';
import { Header } from "../components/Header";

export const Tracking = ({cart}) => {  
  const params = useParams();
  const {orderId, productId} = params;
  const [order, setOrder] = useState(null);
  console.log('orderId '+ orderId);
  console.log('productId '+ productId);
  
  useEffect(() => {
    const fetchOrder = async()=> {
      const response = await axios(`/api/orders/${orderId}?expand=products`)
      setOrder(response.data)    
    }
    fetchOrder();
  }, [orderId]);
    
  if (!orderId) { return null }
  console.log(order)
  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />
      <div className="tracking-page">
        {
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>

            <div className="delivery-date">Arriving on {dayjs(order.orderTimeMs).format('dddd, MMMM D')}</div>

            <div className="product-info">
              Black and Gray Athletic Cotton Socks - 6 Pairs
            </div>

            <div className="product-info">Quantity: 1</div>

            <img
              className="product-image"
              src="images/products/athletic-cotton-socks-6-pairs.jpg"
            />

            <div className="progress-labels-container">
              <div className="progress-label">Preparing</div>
              <div className="progress-label current-status">Shipped</div>
              <div className="progress-label">Delivered</div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        }
      </div>
    </>
  );
};
