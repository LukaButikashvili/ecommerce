import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import localStorageKeys from "../../config/localStorageKeys";
import { addProductToBasketAction } from "../../redux/cart/actions/cartActions";

import QuantityChangerButtons from "../QuantityChangerButtons/QuantityChangerButtons";
import AddToCartCSS from "./AddToCart.module.css";

const notify = () => toast.success("You added Product to the Cart");

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer);

  const addProductToBasket = () => {
    const addNewProductToCart = {
      newProduct: { productId: product.id, quantity: 1 },
    };
    dispatch(addProductToBasketAction(addNewProductToCart));

    notify();

    localStorage.setItem(
      localStorageKeys.CART,
      JSON.stringify({
        ...cart,
        cartProducts: [...cart.cartProducts, addNewProductToCart.newProduct],
      })
    );
  };

  const findIndexOfBasketProduct = cart.cartProducts.findIndex(
    (basketProduct) => basketProduct.productId == product.id
  );

  return (
    <>
      {findIndexOfBasketProduct >= 0 ? (
        <div className={AddToCartCSS.quantityChangerWrapper}>
          <QuantityChangerButtons
            id={product.id}
            quantity={cart.cartProducts[findIndexOfBasketProduct].quantity}
          />
        </div>
      ) : (
        <button
          className={AddToCartCSS.addToCartButton}
          onClick={() => addProductToBasket()}
        >
          Add To Cart
        </button>
      )}
      <Toaster />
    </>
  );
};

export default AddToCart;
