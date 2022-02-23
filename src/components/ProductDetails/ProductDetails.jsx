import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import ProductDetailsCSS from "./ProductDetails.module.css";
import AddToCart from "../AddToCart/AddToCart";
import SavedButton from "../SavedButton/SavedButton";
import NotFoundPage from "../../pages/404/404";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import defaultProductImage from "../../assets/defaultImages/defaultProduct.png";
import localStorageKeys from "../../config/localStorageKeys";
import { removeProductAction } from "../../redux/product/actions/productActions";
import { removeProductFromBasketAction } from "../../redux/cart/actions/cartActions";
import { removeProducFromListAction } from "../../redux/lists/actions/listsActions";

const notify = () => toast.error("You Deleted Product");

const ProductDetails = () => {
  const dispatch = useDispatch();
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
      const newUsers =
        JSON.parse(localStorage.getItem(localStorageKeys.PRODUCTS)) || [];
      findProduct = newUsers.filter((user) => user.id == id);
    }

    setProduct(findProduct[0]);
  }, [id, products]);

  const remove = async () => {
    notify();

    dispatch(removeProductAction(product.id));
    dispatch(removeProductFromBasketAction(product.id));

    //Remove Product from localstore
    const tempProducts = JSON.parse(
      localStorage.getItem(localStorageKeys.PRODUCTS)
    );
    const newData = tempProducts.filter((item) => item.id !== product.id);
    localStorage.setItem(localStorageKeys.PRODUCTS, JSON.stringify(newData));

    //Remove from Cart
    navigate("/");
  };

  return (
    <>
      <Toaster />
      {product ? (
        <>
          <div className={ProductDetailsCSS.productDetailsWrapper}>
            <div className={ProductDetailsCSS.imageWrapper}>
              {product.image ? (
                <img src={product.image} alt="cloth" />
              ) : (
                <img src={defaultProductImage} alt="cloth" />
              )}
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
