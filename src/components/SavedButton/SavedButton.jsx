import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SavedButtonCSS from "./SavedButton.module.css";

const notifySuccess = (name) => toast.success(`Product Added to ${name} List`);
const notify = () => toast.error("Product Deleted from List");

const SavedButton = ({ product }) => {
  const [lists, setLists] = useState({ data: {}, listName: "" });

  useEffect(() => {
    const tempLists = JSON.parse(localStorage.getItem("lists")) || {};
    const keys = Object.keys(tempLists);

    let listName = "";

    for (let i = 0; i < keys.length; i++) {
      for (let k = 0; k < tempLists[keys[i]].length; k++) {
        if (tempLists[keys[i]][k] == product.id) {
          listName = keys[i];
          break;
        }
      }
    }
    setLists(() => {
      return {
        listName: listName,
        data: tempLists,
      };
    });
  }, [product]);

  const changeListForProduct = (e) => {
    const currentValue = e.target.value;
    const tempLists = { ...lists.data };

    tempLists[currentValue].push(product.id);
    localStorage.setItem("lists", JSON.stringify(tempLists));
    setLists(() => {
      return { data: tempLists, listName: currentValue };
    });
    notifySuccess(currentValue);
  };

  const removeItemFromList = () => {
    const tempList = { ...lists.data };
    const removeItem = tempList[lists.listName].filter(
      (item) => item !== product.id
    );
    tempList[lists.listName] = removeItem;

    localStorage.setItem("lists", JSON.stringify(tempList));
    setLists(() => {
      return { data: tempList, listName: "" };
    });
    notify();
  };

  return (
    <>
      {lists.listName ? (
        <button
          onClick={() => removeItemFromList()}
          className={SavedButtonCSS.removeFromLists}
        >
          Remove Product From "<span>{lists.listName}</span>" List
        </button>
      ) : (
        <select
          className={SavedButtonCSS.listsSelector}
          name="listSelector"
          defaultValue=""
          onChange={(e) => changeListForProduct(e)}
          disabled={lists.listName}
        >
          <option value="" selected={lists.listName === ""} disabled hidden>
            Select List
          </option>
          {Object.keys(lists.data).map((list) => {
            return (
              <option
                key={list}
                value={list}
                selected={lists.listName === list}
              >
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
