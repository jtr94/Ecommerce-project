import { React, useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useParams, Link } from "react-router";
import './Tracking.css';
import { Header } from "../components/Header";

export const Tracking = ({ cart }) => {
  const params = useParams();
  const { orderId, productId } = params;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    };

    fetchOrder();
  }, [orderId]);


  if (!order) {
    return <div>Loading...</div>;
  }


  const product = order.products.find(
    (product) => product.productId === productId
  );

  const totalDeliveryTime = product.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMS = dayjs().valueOf() - order.orderTimeMs;
  const deliveryPercent = (timePassedMS/totalDeliveryTime * 100 ) 
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">

          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(product.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D"
            )}
          </div>

          <div className="product-info">
            {product.product.name}
          </div>

          <div className="product-info">
            Quantity: {product.quantity}
          </div>

          <img
            className="product-image"
            src={product.product.image}
            alt={product.product.name}
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{width:`${deliveryPercent > 100 ? 100 : deliveryPercent }%`}}></div>
          </div>

        </div>
      </div>
    </>
  );
};