import React, { useState } from "react";
import { BsFillCreditCardFill } from "react-icons/bs";
import { SiKlarna } from "react-icons/si";
import NumberFormat from "react-number-format";
import toast from "react-hot-toast";

import masterCardImage from "../../assets/creditCards/mastercard.png";
import visaCardImage from "../../assets/creditCards/visa.png";
import paypalCardImage from "../../assets/creditCards/paypal.png";
import americanexpressCardImage from "../../assets/creditCards/americanexpress.png";
import PaymentCSS from "./Payment.module.css";
import { detectCardType } from "../../utils/detectCardType";
import cardTypes from "../../config/cardTypes";

const countries = [
  "Albania",
  "Bulgaria",
  "China",
  "Germany",
  "Georgia",
  "USA",
  "UK",
  "Spain",
  "France",
];

const notify = () => toast.success("You have bought Products");

const Payment = () => {
  const [cardType, setCardType] = useState("");

  const findCardType = (e) => {
    const numbers = e.target.value;
    const type = detectCardType(numbers);

    setCardType(type);
  };

  return (
    <div className={PaymentCSS.paymentWrapper}>
      <div className={PaymentCSS.cardsWrapper}>
        <div className={PaymentCSS.active}>
          <BsFillCreditCardFill />
          <h1>Card</h1>
        </div>
        <div>
          <h1>After Pay</h1>
        </div>
        <div>
          <SiKlarna />
          <h1>Klarna</h1>
        </div>
        <div>
          <h1>...</h1>
        </div>
      </div>
      <div className={PaymentCSS.paymentInputsWrapper}>
        <div className={PaymentCSS.cardNumberWrapper}>
          <label>Card Number</label>
          <div>
            <input
              type="number"
              placeholder="1234 1234 1234 1234"
              onChange={(e) => findCardType(e)}
              required
            />
            <div className={PaymentCSS.cardIconsWrapper}>
              <img
                className={
                  cardType === cardTypes.MASTERCARD ? PaymentCSS.activeCard : ""
                }
                src={masterCardImage}
                alt={cardTypes.MASTERCARD}
              />
              <img
                className={
                  cardType === cardTypes.VISA ? PaymentCSS.activeCard : ""
                }
                src={visaCardImage}
                alt={cardTypes.VISA}
              />
              <img
                className={
                  cardType === cardTypes.AMERICANEXPRESS
                    ? PaymentCSS.activeCard
                    : ""
                }
                src={americanexpressCardImage}
                alt={cardTypes.AMERICANEXPRESS}
              />
              <img
                className={
                  cardType === cardTypes.PAYPAL ? PaymentCSS.activeCard : ""
                }
                src={paypalCardImage}
                alt={cardTypes.PAYPAL}
              />
            </div>
          </div>
        </div>
        <div className={PaymentCSS.exparityWrapper}>
          <div>
            <label>Expirity</label>
            <NumberFormat
              format="##/##"
              placeholder="MM/YY"
              mask={["M", "M", "Y", "Y"]}
              required
            />
            {/* <input type="text" placeholder="MM/YY" /> */}
          </div>
          <div>
            <label>CVC</label>
            <input type="text" placeholder="CVC" max="3" required />
          </div>
        </div>
        <div className={PaymentCSS.countriesSelectWrapper}>
          <label>Country</label>
          <select className={PaymentCSS.select} required>
            <option value="" selected disabled hidden>
              Countries
            </option>
            {countries.map((country) => {
              return (
                <option key={country} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
        </div>
        <div className={PaymentCSS.buyButtonWrapper}>
          <button onClick={() => notify()}>BUY</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
