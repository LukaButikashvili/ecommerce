import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import ListsProduct from "../../components/ListsProduct/ListsProduct";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import statuses from "../../config/statuses";
import ListsCSS from "./Lists.module.css";

const Lists = () => {
  const { status } = useSelector((state) => state.productReducer);

  const [openModal, setOpenModal] = useState(false);
  const [listsItems, setListsItems] = useState(() => {
    return JSON.parse(localStorage.getItem("lists")) || {};
  });

  const createList = (e) => {
    e.preventDefault();
    const listName = e.target.title.value;
    const object = JSON.parse(localStorage.getItem("lists")) || {};

    if (!listName) {
      setOpenModal(false);
      return;
    }

    if (object.hasOwnProperty(listName)) {
      setOpenModal(false);
      return;
    }

    object[listName] = [];

    localStorage.setItem("lists", JSON.stringify(object));
    setListsItems(object);
    setOpenModal(false);
  };

  return (
    <>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <Loader />
      )}
      {status === statuses.SUCCESS && (
        <div className={ListsCSS.listsWrapper}>
          <div className={ListsCSS.listsHeaderWrapper}>
            <h1>Lists</h1>
            <button onClick={() => setOpenModal(true)}>Add</button>
          </div>
          <div>
            {Object.keys(listsItems).map((item) => {
              return (
                <div key={item}>
                  <ListsProduct
                    listName={item}
                    listsProducts={listsItems[item]}
                    listsItems={listsItems}
                    setListsItems={setListsItems}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {openModal && (
        <Modal>
          <div className={ListsCSS.listsFormWrapper}>
            <form onSubmit={(e) => createList(e)}>
              <input
                className={ListsCSS.listsTitleInput}
                type="text"
                name="title"
                placeholder="Enter List Name"
              />
              <input
                className={ListsCSS.listsSubmitInput}
                type="submit"
                value="Create"
              />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Lists;
