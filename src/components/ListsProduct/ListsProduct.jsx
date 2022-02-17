import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import ListProductCSS from "./ListsProduct.module.css";

const ListsProduct = ({
  listsItems,
  setListsItems,
  listName,
  listsProducts,
}) => {
  const { products } = useSelector((state) => state.productReducer);

  const [showModal, setShowModal] = useState(false);

  const removeList = () => {
    const lists = { ...listsItems };
    delete lists[listName];

    localStorage.setItem("lists", JSON.stringify(lists));
    setListsItems(lists);
  };

  const editName = (e) => {
    e.preventDefault();

    const name = e.target.title.value;
    const lists = { ...listsItems };
    lists[name] = lists[listName];
    delete lists[listName];

    localStorage.setItem("lists", JSON.stringify(lists));
    setListsItems(lists);
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
                  <img
                    className={ListProductCSS.listProductsImage}
                    src={findData[0].image}
                    alt="cloth"
                  />
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
