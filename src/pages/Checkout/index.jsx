import CartProductsList from "../../components/CartProductsList/CartProductsList";
import Header from "../../components/Header/Header";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CheckoutCSS from "./Checkout.module.css";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <div className={CheckoutCSS.checkoutWrapper}>
        <div className={CheckoutCSS.checkoutProductsWrapper}>
          <div className={CheckoutCSS.checkoutHeaderWrapper}>
            <div></div>
            <div>Name</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Total Price</div>
          </div>
          <CartProductsList />
        </div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
