import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductDetailsCSS from "./ProductDetails.module.css";
import AddToCart from "../AddToCart/AddToCart";
import SavedButton from "../SavedButton/SavedButton";
import NotFoundPage from "../../pages/404/404";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

const ProductDetails = () => {
  const { data } = useSelector((state) => state.productReducer);

  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (!data.length) {
      return;
    }
    const findProduct = data.filter((item) => item.id == id);
    setProduct(findProduct[0]);
  }, [id, data]);

  return (
    <>
      {product ? (
        <>
          <div className={ProductDetailsCSS.productDetailsWrapper}>
            <div className={ProductDetailsCSS.imageWrapper}>
              <img src={product.image} alt="cloth" />
            </div>
            <div>
              <div className={ProductDetailsCSS.titleWrapper}>
                <h1>{product.title}</h1>
                <h3>Price: {product.price}$</h3>
              </div>
              <p>{product.description}</p>
              <div className={ProductDetailsCSS.buttonsWrapper}>
                <SavedButton product={product} />
                <AddToCart product={product} />
              </div>
            </div>
          </div>
          <RelatedProducts />
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default ProductDetails;
