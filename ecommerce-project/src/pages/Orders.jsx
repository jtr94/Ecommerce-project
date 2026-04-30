import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./Orders.css";
import { Header } from "../components/Header";
import { formatMoney } from "../utils/money";

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
            <div className="orders-grid">
               {orders.map((orderItem) => {
               return (
                 <>
                   <div key={orderItem.id} className="order-container">
                     <div className="order-header">
                       <div className="order-header-left-section">
                         <div className="order-date">
                           <div className="order-header-label">
                             Order Placed:
                           </div>
                           <div>
                             {" "}
                             {dayjs(orderItem.orderTimeMs).format("M d")}{" "}
                           </div>
                         </div>
                         <div className="order-total">
                           <div className="order-header-label">Total:</div>
                           <div>{formatMoney(orderItem.totalCostCents)}</div>
                         </div>
                       </div>

                       <div className="order-header-right-section">
                         <div className="order-header-label">Order ID:</div>
                         <div>{orderItem.id}</div>
                       </div>
                     </div>
                     {orderItem.products.map((order)=>{
                      console.log(order)
                      return(
                      <div className="order-details-grid">
                        <div className="product-image-container">
                          <img src={order.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {order.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(order.estimatedDeliveryTimeMs).format("MMMM D")}
                          </div>
                          <div className="product-quantity">Quantity: {order.quantity}</div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>
                        <div className="product-actions">
                          <a href="tracking.html">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>                       
                      </div>

                     )})};
                   </div>
                 </>
               );
             })}
            </div>
          
      </div>
    </>
  );
};
