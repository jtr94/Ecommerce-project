import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { formatMoney } from "../../utils/money";

export const OrderSummary = ({ deliveryOptions, cart, updateCart }) => {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((item) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => deliveryOption.id === item.deliveryOptionId,
          );
          return (
            <div key={item.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="cart-item-details-grid">
                <img className="product-image" src={item.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{item.product.name}</div>
                  <div className="product-price">
                    {formatMoney(item.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
                {
                  <div className="delivery-options">
                    <div className="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    {deliveryOptions.map((deliveryOption) => {
                      return (
                        <DeliveryOptions
                          key={deliveryOption.id}
                          deliveryOption={deliveryOption}
                          item={item}
                          updateCart={updateCart}
                        />
                      );
                    })}
                  </div>
                }
              </div>
              );
            </div>
          );
        })}
    </div>
  );
};
