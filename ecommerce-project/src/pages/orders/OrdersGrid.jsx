import dayjs from 'dayjs';
import axios from 'axios';
import { Link } from 'react-router';
import { formatMoney } from '../../utils/money';

export const OrdersGrid = ({ orders, updateCart}) => {
  const addToCart = async (productId) => { 
          await axios.post("http://localhost:3000/api/cart-items", {
            productId: productId,
            quantity: 1,
          });
          await updateCart();
    }
  return (
    <div className="orders-grid">
      {orders.map((orderItem) => {
        return (        
            <div key={orderItem.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(orderItem.orderTimeMs).format("MMMM D")}</div>
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
              {orderItem.products.map((order) => {
                return (
                  <div key={order.productId} className="order-details-grid">
                    <div className="product-image-container">
                      <img src={order.product.image} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">{order.product.name}</div>
                      <div className="product-delivery-date">
                        Arriving on: {dayjs(order.estimatedDeliveryTimeMs).format("MMMM D")}
                      </div>
                      <div className="product-quantity">
                        Quantity: {order.quantity}
                      </div>
                      <button 
                          className="buy-again-button button-primary"
                          onClick={()=> addToCart(order.productId)}
                      >
                        <img
                          className="buy-again-icon"
                          src="images/icons/buy-again.png"
                        />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>
                    <div className="product-actions">
                      <Link to={`/tracking/${orderItem.id}/${order.productId}`} >
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>        
        );
      })}
    </div>
  );
}
