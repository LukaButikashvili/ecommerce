import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import {
  addProductToSavedAction,
  removeProductFromSavedAction,
} from "../../redux/saved/actions/savedActions";
import SavedButtonCSS from "./SavedButton.module.css";

const notifySuccess = () => toast.success("Product Added to Saved");
const notify = () => toast.error("Product Deleted from Saved");

const SavedButton = ({ product }) => {
  const dispatch = useDispatch();
  const savedProducts = useSelector((state) => state.savedReducer);

  const [productIsSaved, setProductIsSaved] = useState(false);

  useEffect(() => {
    const findProduct = savedProducts.filter((item) => item.id === product.id);

    console.log(findProduct);
    if (findProduct.length) {
      setProductIsSaved(true);
    } else {
      setProductIsSaved(false);
    }
  }, [savedProducts, product]);

  const removeProduct = () => {
    dispatch(removeProductFromSavedAction(product.id));
    notify();
  };

  const addProduct = () => {
    dispatch(addProductToSavedAction(product));
    notifySuccess();
  };

  return (
    <>
      {productIsSaved ? (
        <button
          className={SavedButtonCSS.removeFromSavedButton}
          onClick={() => removeProduct()}
        >
          Remove From Saved
        </button>
      ) : (
        <button
          className={SavedButtonCSS.addToSavedButton}
          onClick={() => addProduct()}
        >
          Add To Saved
        </button>
      )}
      <Toaster />
    </>
  );
};

export default SavedButton;
