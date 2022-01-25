import React, { useState } from "react";
import { useSelector } from "react-redux";
import QuantityChangerButtons from "../QuantityChangerButtons/QuantityChangerButtons";
import CartProductCSS from "./CartProduct.module.css";

const CartProduct = ({ id, quantity }) => {
  const { data } = useSelector((state) => state.productReducer);

  const [cartProduct, setCartProduct] = useState(() => {
    const findItem = data.filter((item) => item.id === id);
    return findItem[0];
  });

  return (
    <div className={CartProductCSS.cartProductWrapper}>
      <div>
        <img src={cartProduct.image} alt="cloth" />
      </div>
      <div className={CartProductCSS.cartProductNameWrapper}>
        <h1>{cartProduct.title}</h1>
      </div>
      <div>
        <div className={CartProductCSS.quantityChangerButtonsWrapper}>
          <QuantityChangerButtons id={id} quantity={quantity} />
        </div>
      </div>
      <div>{cartProduct.price}</div>
      <div>{cartProduct.price * quantity}</div>
    </div>
  );
};

export default CartProduct;
