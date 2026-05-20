import { useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';

export const CartItemDetails = ({item, deliveryOptions,  selectedDeliveryOption, updateCart}) => {
  const [ updateQty, setupdateQty] = useState(false)
  const [ quantity, setQuantity] = useState()
  const deleteItem = async(itemId)=>{
      await axios.delete(`http://localhost:3000/api/cart-items/${itemId}`);
      await updateCart();
  }
  const updateItemQty= async ({productId, quantity}) => {    
    await axios.put(`http://localhost:3000/api/cart-items/${productId}`, {
      quantity: quantity,
    });
    await updateCart();
  };
  return (
    <div className="cart-item-container">
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
              Quantity: <span className="quantity-label">{item.quantity}</span>
            </span>
            {updateQty && (
              <input
                type="text"
                className="quantity-input"
                value={quantity}
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  Number.isInteger(newQuantity) && setQuantity(newQuantity);
                }}
              />
            )}
            <span
              className="update-quantity-link link-primary"
              style={{textDecoration:`${updateQty? 'underline': 'none' }`}}
              onClick={() => {
                if (updateQty) {
                   updateItemQty({productId: item.product.id, quantity:quantity})
                   setupdateQty(false);
                } else {
                  setupdateQty(true);
                  setQuantity(item.quantity);
                }
              }}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={() => deleteItem(item.productId)}
            >
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
    </div>
  );
}
