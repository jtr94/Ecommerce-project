import dayjs from 'dayjs';
import React from 'react'
import { formatMoney } from '../../utils/money';

export const DeliveryOptions = ({deliveryOptions, item}) => {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              checked={item.deliveryOptionId === deliveryOption.id}
              className="delivery-option-input"
              name={`${item.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price">
                {deliveryOption.priceCents > 0
                  ? `${formatMoney(deliveryOption.priceCents)} - Shipping`
                  : "Free Shiping"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
