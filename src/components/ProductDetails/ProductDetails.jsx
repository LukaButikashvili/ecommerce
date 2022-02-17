import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import ProductDetailsCSS from "./ProductDetails.module.css";
import AddToCart from "../AddToCart/AddToCart";
import SavedButton from "../SavedButton/SavedButton";
import NotFoundPage from "../../pages/404/404";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { removeProduct } from "../../api";

const notify = () => toast.error("You Deleted Product");

const ProductDetails = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const { products } = useSelector((state) => state.productReducer);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (!products.length) {
      return;
    }
    let findProduct = products.filter((item) => item.id == id);

    if (!findProduct.length) {
      const newUsers = JSON.parse(localStorage.getItem("products")) || [];
      findProduct = newUsers.filter((user) => user.id == id);
    }

    setProduct(findProduct[0]);
  }, [id, products]);

  const remove = async () => {
    notify();

    // Remove Product From API
    if (typeof product.id === "number") {
      const sendRemoveRequest = await removeProduct(product.id);
      if (sendRemoveRequest) {
        toast.remove();
        navigate("/");
      }
      return;
    }

    //Remove Product from localstore
    const tempProducts = JSON.parse(localStorage.getItem("products"));
    const newData = tempProducts.filter((item) => item.id !== product.id);
    localStorage.setItem("products", JSON.stringify(newData));
    navigate("/");
  };
  console.log(product);

  return (
    <>
      {product ? (
        <>
          <div className={ProductDetailsCSS.productDetailsWrapper}>
            <div className={ProductDetailsCSS.imageWrapper}>
              <img src={product.image} alt="cloth" />
            </div>
            <div className={ProductDetailsCSS.productDetailsBodyWrapper}>
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
          <div className={ProductDetailsCSS.removeProductWrapper}>
            <button onClick={() => remove()}>Remove Product</button>
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
