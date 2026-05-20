import { DeliveryOptions } from "./DeliveryOptions";
import { formatMoney } from "../../utils/money";
import { CartItemDetails } from "./CartItemDetails";


export const OrderSummary = ({ deliveryOptions, cart, updateCart }) => {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((item) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => deliveryOption.id === item.deliveryOptionId,
          );
          return (
            <CartItemDetails 
                key={item.productId} 
                item={item} 
                deliveryOptions={deliveryOptions} 
                selectedDeliveryOption={selectedDeliveryOption}
                updateCart={updateCart}
            />
          );
        })}
    </div>
  );
};
