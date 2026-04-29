import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { formatMoney } from "../../utils/money";

export const CheckoutPage = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary  ] = useState(null);
  useEffect(() => {
    axios("http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime").then((response) =>
      setDeliveryOptions(response.data),
    );
    axios("http://localhost:3000/api/payment-summary").then((response) =>
      setPaymentSummary(response.data)
     );
  }, []);
  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cart.map((item) => {
                const selectedDeliveryOption = deliveryOptions.find(
                  (deliveryOption) =>
                    deliveryOption.id === item.deliveryOptionId,
                );
                return (
                  <div key={item.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs,
                      ).format("dddd, MMMM D")}
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
                            <span className="quantity-label">
                              {item.quantity}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>
                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryOption) => {
                          console.log(deliveryOption);
                          return (
                            <div
                              key={deliveryOption.id}
                              className="delivery-option"
                            >
                              <input
                                type="radio"
                                checked={
                                  item.deliveryOptionId === deliveryOption.id
                                }
                                className="delivery-option-input"
                                name={`${item.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs,
                                  ).format("dddd, MMMM D")}
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
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
                <div className="payment-summary-title">Payment Summary</div>
                
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>taxCents
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div> 
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
