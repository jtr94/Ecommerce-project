import axios from "axios";
import { formatMoney } from "../../utils/money";
import { Product } from "./Product";

export const ProductsGrid = ({ products, updateCart }) => {
   return(
    <div className="products-grid">
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              updateCart={updateCart}
            />
          );
        })}
    </div>

   )
};
