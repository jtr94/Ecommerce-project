import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { formatMoney } from "../../utils/money";

export const DeliveryOptions = ({ deliveryOption, updateCart, item }) => {
  const updateDeliveryOption = async () => {
    await axios.put(`http://localhost:3000/api/cart-items/${item.productId}`, {
      deliveryOptionId: deliveryOption.id,
    });
    updateCart();
  };
  return (
    <div
      key={deliveryOption.id}
      className="delivery-option"
      onClick={updateDeliveryOption}
    >
      <input
        type="radio"
        checked={item.deliveryOptionId === deliveryOption.id}
        onChange={() => {}}
        className="delivery-option-input"
        name={`${item.productId}`}
      />
      <div>
        <div className="delivery-option-date">
          {dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
        </div>
        <div className="delivery-option-price">
          {deliveryOption.priceCents > 0
            ? `${formatMoney(deliveryOption.priceCents)} - Shipping`
            : "Free Shiping"}
        </div>
      </div>
    </div>
  );
};
