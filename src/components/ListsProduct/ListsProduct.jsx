import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  editListNameAction,
  removeListAction,
} from "../../redux/lists/actions/listsActions";
import toast from "react-hot-toast";

import Modal from "../Modal/Modal";
import defaultProductImage from "../../assets/defaultImages/defaultProduct.png";
import ListProductCSS from "./ListsProduct.module.css";
import localStorageKeys from "../../config/localStorageKeys";

const notifyForRemove = () => toast.error("List has been removed");
const notifyForEdit = (oldName, newName) =>
  toast.success(`List name "${oldName}" has been changed to "${newName}"`);

const ListsProduct = ({ listName, listsProducts }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const lists = useSelector((state) => state.listsReducer);

  const [showModal, setShowModal] = useState(false);

  const removeList = () => {
    const tempLists = { ...lists };
    delete tempLists[listName];

    notifyForRemove();

    localStorage.setItem(localStorageKeys.LISTS, JSON.stringify(tempLists));
    dispatch(removeListAction(listName));
  };

  const editName = (e) => {
    e.preventDefault();
    const name = e.target.title.value;

    notifyForEdit(listName, name);

    const tempLists = { ...lists };

    tempLists[name] = tempLists[listName];
    delete tempLists[listName];

    localStorage.setItem(localStorageKeys.LISTS, JSON.stringify(tempLists));
    dispatch(editListNameAction(name, listName));
  };

  return (
    <>
      <div className={ListProductCSS.listProductsWrapper}>
        <div className={ListProductCSS.listProductsTitleWrapper}>
          <h1>{listName}</h1>
          <div>
            <button onClick={() => setShowModal(true)}>Edit</button>
            <button onClick={() => removeList()}>Remove</button>
          </div>
        </div>

        <Link id={listName} to={`${listName}`}>
          <div className={ListProductCSS.productsWrapper}>
            {listsProducts.map((productId) => {
              const findData = products.filter((item) => item.id == productId);
              console.log(findData);
              return (
                <Link
                  id={productId}
                  key={productId}
                  to={`/products/${productId}`}
                >
                  {findData[0].image ? (
                    <img
                      className={ListProductCSS.listProductsImage}
                      src={findData[0].image}
                      alt="cloth"
                    />
                  ) : (
                    <img
                      className={ListProductCSS.listProductsImage}
                      src={defaultProductImage}
                      alt="cloth"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </Link>
      </div>
      {showModal && (
        <Modal>
          <form onSubmit={(e) => editName(e)}>
            <input type="text" name="title" defaultValue={listName} />
            <input type="submit" name="submit" value="save" />
          </form>
        </Modal>
      )}
    </>
  );
};

export default ListsProduct;
