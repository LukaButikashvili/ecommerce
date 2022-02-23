import React from "react";
import { useSelector } from "react-redux";
import statuses from "../../config/statuses";
import CartProduct from "../CartProduct/CartProduct";
import Loader from "../Loader/Loader";

const CartProductsList = () => {
  const { cartProducts } = useSelector((state) => state.cartReducer);
  const { products } = useSelector((state) => state.productReducer);

  return (
    <>
      {cartProducts.map((product) => {
        const findItem = products.filter(
          (item) => item.id === product.productId
        );
        return (
          <CartProduct
            key={product.productId}
            id={product.productId}
            quantity={product.quantity}
            cartProduct={findItem[0]}
          />
        );
      })}
    </>
  );
};

export default CartProductsList;
