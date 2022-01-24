import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetailsCSS from "./ProductDetails.module.css";
import AddToCart from "../AddToCart/AddToCart";

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
          <button className={ProductDetailsCSS.savedButton}>
            Add To Saved
          </button>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
