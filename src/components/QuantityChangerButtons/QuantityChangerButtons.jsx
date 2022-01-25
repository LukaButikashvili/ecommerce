import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
} from "../../redux/cart/actions/cartActions";
import QuantityChangerButtonsCSS from "./QuantityChangerButtons.module.css";

const QuantityChangerButtons = ({ id, quantity }) => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className={QuantityChangerButtonsCSS.button}
        onClick={() => dispatch(decreaseProductQuantity(id))}
        disabled={quantity === 1}
      >
        -
      </button>
      <h1 className={QuantityChangerButtonsCSS.header}>{quantity}</h1>
      <button
        className={QuantityChangerButtonsCSS.button}
        onClick={() => dispatch(increaseProductQuantity(id))}
      >
        +
      </button>
    </>
  );
};

export default QuantityChangerButtons;
