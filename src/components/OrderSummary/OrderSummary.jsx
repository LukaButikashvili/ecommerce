import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import PromoCode from "../PromoCode/PromoCode";
import OrderSummaryCSS from "./OrderSummary.module.css";

const notify = () => toast.success("You have bought products");

const calculateTotalPrice = (data) => {
  let totalPrice = 0;
  data.map((item) => {
    totalPrice = totalPrice + item.price * item.quantity;
  });
  return totalPrice;
};

const OrderSummary = () => {
  const cartProducts = useSelector((state) => state.cartReducer);

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartProducts.products));
    setDiscountPrice(0);
  }, [cartProducts]);

  return (
    <div className={OrderSummaryCSS.oderSummaryWrapper}>
      <h1>SUMMARY</h1>
      <PromoCode totalPrice={totalPrice} setDiscountPrice={setDiscountPrice} />
      <div className={OrderSummaryCSS.shoppingCostWrapper}>
        <h1>Shopping cost</h1>
        <h1>{totalPrice}$</h1>
      </div>
      <div className={OrderSummaryCSS.discountWrapper}>
        <h1>Discount</h1>
        <h1>-{discountPrice}$</h1>
      </div>
      <div className={OrderSummaryCSS.finalPriceWrapper}>
        <h1>ESTIMATE TOTAL</h1>
        <h1>{totalPrice - discountPrice}$</h1>
      </div>
      <div className={OrderSummaryCSS.placeOrderWrapper}>
        <button onClick={() => notify()}>Place Order</button>
      </div>
      <Toaster />
    </div>
  );
};

export default OrderSummary;
