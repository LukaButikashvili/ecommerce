import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import defaultProductImage from "../../assets/defaultImages/defaultProduct.png";
import CartProductsViewCSS from "./CartProductsView.module.css";

const CartProductsView = ({
  cartProducts,
  showGridView,
  colorSameProducts = false,
}) => {
  const { products } = useSelector((state) => state.productReducer);

  return (
    <div>
      <div
        className={
          showGridView
            ? CartProductsViewCSS.gridViewWrapper
            : CartProductsViewCSS.listViewWrapper
        }
      >
        {cartProducts.map((cartProduct) => {
          const findProduct = products.find(
            // eslint-disable-next-line eqeqeq
            (product) =>
              product.id == cartProduct.productId || product.id == cartProduct
          );
          return (
            <div
              key={findProduct.id}
              className={
                colorSameProducts
                  ? cartProduct.areSame
                    ? CartProductsViewCSS.areSameProducts
                    : CartProductsViewCSS.areNotSameProducts
                  : ""
              }
            >
              <div
                className={
                  showGridView
                    ? CartProductsViewCSS.gridViewBodyWrapper
                    : CartProductsViewCSS.bodyWrapper
                }
              >
                <div className={CartProductsViewCSS.imageWrapper}>
                  <Link to={`/products/${findProduct.id}`}>
                    {findProduct.image ? (
                      <img src={findProduct.image} alt="cloth" />
                    ) : (
                      <img src={defaultProductImage} alt="cloth" />
                    )}
                  </Link>
                </div>
                <h1>
                  <Link to={`/products/${findProduct.id}`}>
                    {findProduct.title}
                  </Link>
                </h1>
                <h2>Price: {findProduct.price}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartProductsView;
