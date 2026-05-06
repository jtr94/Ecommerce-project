import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./Orders.css";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";

export const Orders = ({ cart }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios("/api/orders?expand=products").then((response) =>
      setOrders(response.data),
    );
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>       
          <OrdersGrid orders={orders} />          
      </div>
    </>
  );
};
