import React from "react";
import { useDispatch } from "react-redux";
import { removeProductFromBasketAction } from "../../redux/cart/actions/cartActions";
import QuantityChangerButtons from "../QuantityChangerButtons/QuantityChangerButtons";
import CartProductCSS from "./CartProduct.module.css";
import defaultProductImage from "../../assets/defaultImages/defaultProduct.png";

const CartProduct = ({ id, quantity, cartProduct }) => {
  const dispatch = useDispatch();

  return (
    <div className={CartProductCSS.cartProductWrapper}>
      <div className={CartProductCSS.cartProductImageWrapper}>
        {cartProduct.image ? (
          <img src={cartProduct.image} alt="cloth" />
        ) : (
          <img src={defaultProductImage} alt="cloth" />
        )}
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
