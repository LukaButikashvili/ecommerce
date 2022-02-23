import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Toggle from "../Toggle/Toggle";
import SavedProductsListCSS from "./SavedProductsList.module.css";
import AddToCart from "../AddToCart/AddToCart";
import CartProductsView from "../CartProductsView/CartProductsView";
import { useSelector } from "react-redux";
import SavedButton from "../SavedButton/SavedButton";
import localStorageKeys from "../../config/localStorageKeys";

const notify = () => toast.error("Product Deleted from List");

const SavedProductsList = () => {
  const { products } = useSelector((state) => state.productReducer);
  console.log(products);

  const [showGridView, setShowGridView] = useState(true);

  const [lists, setLists] = useState(() => {
    const localstorageLists = JSON.parse(
      localStorage.getItem(localStorageKeys.LISTS)
    );
    const keys = Object.keys(localstorageLists);

    let listsproducts = [];

    for (let i = 0; i < keys.length; i++) {
      listsproducts = [...listsproducts, ...localstorageLists[keys[i]]];
    }
    return listsproducts;
  });

  const removeItemFromList = (product) => {
    const localstorageLists = JSON.parse(
      localStorage.getItem(localStorageKeys.LISTS)
    );
    const keys = Object.keys(localstorageLists);

    for (let i = 0; i < keys.length; i++) {
      console.log(localstorageLists[i]);
      localstorageLists[i].filter((item) => item.id != product.id);
    }

    notify();
  };

  return (
    <div className={SavedProductsListCSS.savedProductsWrapper}>
      <div className={SavedProductsListCSS.savedProductsTitle}>
        <h1>Saved Items</h1>
        <Toggle showGridView={showGridView} setShowGridView={setShowGridView} />
      </div>
      <div className={SavedProductsListCSS.savedProductsListWrapper}>
        <div
          className={
            showGridView
              ? SavedProductsListCSS.gridViewWrapper
              : SavedProductsListCSS.listViewWrapper
          }
        >
          {lists.map((cartProduct) => {
            const findProduct = products.find(
              // eslint-disable-next-line eqeqeq
              (product) =>
                product.id == cartProduct.productId || product.id == cartProduct
            );

            return (
              <div key={cartProduct.id}>
                <div
                  className={
                    showGridView
                      ? SavedProductsListCSS.gridViewBodyWrapper
                      : SavedProductsListCSS.bodyWrapper
                  }
                >
                  <div className={SavedProductsListCSS.imageWrapper}>
                    <Link to={`/products/${findProduct.id}`}>
                      <img src={findProduct.image} alt="cloth" />
                    </Link>
                  </div>
                  <h1>
                    <Link to={`/products/${findProduct.id}`}>
                      {findProduct.title}
                    </Link>
                  </h1>
                  <h2>Price: {findProduct.price}</h2>
                  <div className={SavedProductsListCSS.buttonsWrapper}>
                    <SavedButton product={findProduct} />
                    <AddToCart product={findProduct} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedProductsList;
