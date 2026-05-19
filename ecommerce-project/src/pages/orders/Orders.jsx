import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./Orders.css";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";

export const Orders = ({ cart, updateCart }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async()=> {
      const response = await axios("/api/orders?expand=products")
      setOrders(response.data)    
    }
    fetchOrders();
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>       
          <OrdersGrid orders={orders} updateCart={updateCart}/>          
      </div>
    </>
  );
};
