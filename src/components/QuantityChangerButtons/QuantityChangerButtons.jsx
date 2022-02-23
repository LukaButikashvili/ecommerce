import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import localStorageKeys from "../../config/localStorageKeys";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
} from "../../redux/cart/actions/cartActions";
import QuantityChangerButtonsCSS from "./QuantityChangerButtons.module.css";

const QuantityChangerButtons = ({ id, quantity }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);

  const decreaseQuantity = () => {
    dispatch(decreaseProductQuantity(id));

    const findProductIndex = cart.cartProducts.findIndex(
      (product) => product.productId === id
    );
    const data = JSON.parse(localStorage.getItem(localStorageKeys.CART));

    data.cartProducts[findProductIndex] = {
      ...data.cartProducts[findProductIndex],
      quantity: data.cartProducts[findProductIndex].quantity - 1,
    };

    localStorage.setItem(localStorageKeys.CART, JSON.stringify(data));
  };

  const increaseQuantity = () => {
    dispatch(increaseProductQuantity(id));

    const findProductIndex = cart.cartProducts.findIndex(
      (product) => product.productId === id
    );
    const data = JSON.parse(localStorage.getItem(localStorageKeys.CART));

    data.cartProducts[findProductIndex] = {
      productId: id,
      quantity: data.cartProducts[findProductIndex].quantity + 1,
    };

    localStorage.setItem(localStorageKeys.CART, JSON.stringify(data));
  };

  return (
    <>
      <button
        className={QuantityChangerButtonsCSS.button}
        onClick={() => decreaseQuantity()}
        disabled={quantity === 1}
      >
        -
      </button>
      <h1 className={QuantityChangerButtonsCSS.header}>{quantity}</h1>
      <button
        className={QuantityChangerButtonsCSS.button}
        onClick={() => increaseQuantity()}
      >
        +
      </button>
    </>
  );
};

export default QuantityChangerButtons;
