import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Header from "../../components/Header/Header";
import ListsProduct from "../../components/ListsProduct/ListsProduct";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import localStorageKeys from "../../config/localStorageKeys";
import statuses from "../../config/statuses";
import { addListAction } from "../../redux/lists/actions/listsActions";
import ListsCSS from "./Lists.module.css";

const notify = () => toast.success("List has been added");

const Lists = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.productReducer);
  const lists = useSelector((state) => state.listsReducer);

  const [openModal, setOpenModal] = useState(false);

  const createList = (e) => {
    e.preventDefault();
    const listName = e.target.title.value;
    const tempList = { ...lists };

    if (!listName) {
      setOpenModal(false);
      return;
    }

    if (tempList.hasOwnProperty(listName)) {
      setOpenModal(false);
      return;
    }

    tempList[listName] = [];

    notify();

    localStorage.setItem(localStorageKeys.LISTS, JSON.stringify(tempList));
    dispatch(addListAction(listName));

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
            {Object.keys(lists).map((item) => {
              return (
                <div key={item}>
                  <ListsProduct listName={item} listsProducts={lists[item]} />
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
