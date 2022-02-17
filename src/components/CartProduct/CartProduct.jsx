import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromBasketAction } from "../../redux/cart/actions/cartActions";
import QuantityChangerButtons from "../QuantityChangerButtons/QuantityChangerButtons";
import CartProductCSS from "./CartProduct.module.css";

const CartProduct = ({ id, quantity }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);

  const [cartProduct, setCartProduct] = useState(() => {
    const findItem = products.filter((item) => item.id === id);
    return findItem[0];
  });

  return (
    <div className={CartProductCSS.cartProductWrapper}>
      <div className={CartProductCSS.cartProductImageWrapper}>
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
      {/* <button
        onClick={() => dispatch(removeProductFromBasketAction(cartProduct.id))}
      >
        Remove
      </button> */}
    </div>
  );
};

export default CartProduct;
