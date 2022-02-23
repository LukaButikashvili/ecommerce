import { useSelector } from "react-redux";

import CartProductsList from "../../components/CartProductsList/CartProductsList";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import statuses from "../../config/statuses";
import CheckoutCSS from "./Checkout.module.css";

const CheckoutPage = () => {
  const { products, status } = useSelector((state) => state.productReducer);

  return (
    <div>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <Loader />
      )}
      {status === statuses.SUCCESS && (
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
      )}
    </div>
  );
};

export default CheckoutPage;
