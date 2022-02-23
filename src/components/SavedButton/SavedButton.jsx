import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import localStorageKeys from "../../config/localStorageKeys";
import {
  addProductToListAction,
  removeProducFromListAction,
} from "../../redux/lists/actions/listsActions";

import SavedButtonCSS from "./SavedButton.module.css";

const notifySuccess = (name) => toast.success(`Product Added to ${name} List`);
const notify = () => toast.error("Product Deleted from List");

const SavedButton = ({ product }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.listsReducer);

  const [name, setName] = useState("");

  // Find list name where product is
  useEffect(() => {
    const keys = Object.keys(lists);

    let listName = "";

    for (let i = 0; i < keys.length; i++) {
      for (let k = 0; k < lists[keys[i]].length; k++) {
        if (lists[keys[i]][k] == product.id) {
          listName = keys[i];
          break;
        }
      }
    }

    setName(listName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const addProductToList = (e) => {
    const currentValue = e.target.value;

    const tempLists =
      JSON.parse(localStorage.getItem(localStorageKeys.LISTS)) || {};
    tempLists[currentValue].push(product.id);
    localStorage.setItem(localStorageKeys.LISTS, JSON.stringify(tempLists));

    dispatch(addProductToListAction(currentValue, product.id));
    setName(currentValue);

    notifySuccess(currentValue);
  };

  const removeProductFromList = () => {
    const tempLists =
      JSON.parse(localStorage.getItem(localStorageKeys.LISTS)) || {};
    const removeItem = tempLists[name].filter((item) => item !== product.id);
    tempLists[name] = removeItem;

    localStorage.setItem(localStorageKeys.LISTS, JSON.stringify(tempLists));
    dispatch(removeProducFromListAction(name, product.id));
    setName("");

    notify();
  };

  return (
    <>
      {name ? (
        <button
          onClick={() => removeProductFromList()}
          className={SavedButtonCSS.removeFromLists}
        >
          Remove Product From "<span>{name}</span>" List
        </button>
      ) : (
        <select
          className={SavedButtonCSS.listsSelector}
          name="listSelector"
          defaultValue=""
          onChange={(e) => addProductToList(e)}
          disabled={name}
        >
          <option value="" disabled hidden>
            Select List
          </option>
          {Object.keys(lists).map((list) => {
            return (
              <option key={list} value={list}>
                {list}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
};

export default SavedButton;
