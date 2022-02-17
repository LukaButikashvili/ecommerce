import { useSelector } from "react-redux";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

import Header from "../../components/Header/Header";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import statuses from "../../config/statuses";
import { Link } from "react-router-dom";
import GridView from "../../components/GridView/GridView";
import ProductCSS from "./Product.module.css";
import CartProductsView from "../../components/CartProductsView/CartProductsView";

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%; -50%);
`;

const ProductPage = () => {
  const { status } = useSelector((state) => state.productReducer);
  const { cartProducts } = useSelector((state) => state.cartReducer);

  return (
    <div>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <BarLoader css={override} size={150} />
      )}
      {status === statuses.SUCCESS && (
        <>
          <ProductDetails />
          <div className={ProductCSS.cartProductTitlesWrapper}>
            <h1>Cart</h1>
            <Link to="/diff">
              <button className={ProductCSS.compareButton}>Compare</button>
            </Link>
          </div>
          <div className={ProductCSS.myCartProductsWrapper}>
            {
              <CartProductsView
                cartProducts={cartProducts}
                showGridView={false}
              />
            }
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
