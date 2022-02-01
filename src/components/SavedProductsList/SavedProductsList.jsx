import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toggle from "../Toggle/Toggle";
import SavedProductsListCSS from "./SavedProductsList.module.css";
import AddToCart from "../AddToCart/AddToCart";
import SavedButton from "../SavedButton/SavedButton";

const SavedProductsList = () => {
  const savedProducts = useSelector((state) => state.savedReducer);
  const [showGridView, setShowGridView] = useState(true);
  return (
    <div className={SavedProductsListCSS.savedProductsWrapper}>
      <div className={SavedProductsListCSS.savedProductsTitle}>
        <h1>Saved Items</h1>
        <Toggle showGridView={showGridView} setShowGridView={setShowGridView} />
      </div>
      <div className={SavedProductsListCSS.listViewWrapper}>
        {savedProducts.map((product) => {
          return (
            <div key={product.id} className={SavedProductsListCSS.bodyWrapper}>
              <div className={SavedProductsListCSS.imageWrapper}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt="cloth" />
                </Link>
              </div>
              <h1>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </h1>
              <h2>Price: {product.price}</h2>
              <div className={SavedProductsListCSS.savedProductsButtons}>
                <SavedButton product={product} />
                <AddToCart product={product} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedProductsList;
