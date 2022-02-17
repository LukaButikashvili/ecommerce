import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import promoCodes from "../../config/promocodes";
import PromoCodeCSS from "./PromoCode.module.css";

const notify = () => toast.success("PromoCode is Correct");

const PromoCode = ({ totalPrice, setDiscountPrice }) => {
  const checkPromoCode = (e) => {
    e.preventDefault();
    const promo = e.target.code.value;
    const findPromo = promoCodes.filter((code) => code.name === promo);

    const calculateDiscountPrice = (
      (findPromo[0].discountPercent * totalPrice) /
      100
    ).toFixed(2);

    if (findPromo.length) {
      setDiscountPrice(calculateDiscountPrice);
      notify();
    }
  };

  return (
    <div className={PromoCodeCSS.promoCodeWrapper}>
      <h1>Enter Promo Code</h1>
      <form onSubmit={(e) => checkPromoCode(e)}>
        <input
          className={PromoCodeCSS.textInput}
          type="text"
          name="code"
          placeholder="Promo Code"
        />
        <input
          className={PromoCodeCSS.submitInput}
          type="submit"
          value="apply"
        />
      </form>
      <Toaster />
    </div>
  );
};

export default PromoCode;
