import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../CartProduct/CartProduct";

const CartProductsList = () => {
  const { cartProducts } = useSelector((state) => state.cartReducer);

  return (
    <>
      {cartProducts.map((product) => {
        return (
          <CartProduct
            key={product.productId}
            id={product.productId}
            quantity={product.quantity}
          />
        );
      })}
    </>
  );
};

export default CartProductsList;
