import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import PromoCode from "../PromoCode/PromoCode";
import OrderSummaryCSS from "./OrderSummary.module.css";
import Modal from "../Modal/Modal";
import Payment from "../Payment/Payment";

const notify = () => toast.success("You have bought products");

const calculateTotalPrice = (data) => {
  let totalPrice = 0;
  data.map((item) => {
    totalPrice = totalPrice + item.price * item.quantity;
  });
  return totalPrice;
};

const OrderSummary = () => {
  const { cartProducts } = useSelector((state) => state.cartReducer);
  const { products } = useSelector((state) => state.productReducer);

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let price = 0;
    cartProducts.map((cartProduct) => {
      const findProduct = products.find(
        (item) => cartProduct.productId === item.id
      );
      price = price + cartProduct.quantity * findProduct.price;
    });

    setTotalPrice(price);
    setDiscountPrice(0);
  }, [cartProducts]);

  return (
    <>
      <div className={OrderSummaryCSS.oderSummaryWrapper}>
        <h1>SUMMARY</h1>
        <PromoCode
          totalPrice={totalPrice}
          setDiscountPrice={setDiscountPrice}
        />
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
          <button onClick={() => setShowModal(true)}>Place Order</button>
        </div>
        <Toaster />
      </div>
      {showModal && (
        <Modal>
          <Payment />
        </Modal>
      )}
    </>
  );
};

export default OrderSummary;
