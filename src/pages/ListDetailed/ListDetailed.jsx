import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartProductsView from "../../components/CartProductsView/CartProductsView";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import statuses from "../../config/statuses";
import ListDetailedCSS from "./ListDetailed.module.css";

const ListDetailed = () => {
  const { listName } = useParams();
  const { status } = useSelector((state) => state.productReducer);

  const [listProducts, setListProducts] = useState(() => {
    const tempListsProducts = JSON.parse(localStorage.getItem("lists")) || {};

    return tempListsProducts[listName];
  });

  return (
    <>
      <Header />
      <div>
        {(status === statuses.INITIAL || status === statuses.PENDING) && (
          <Loader />
        )}
        <div className={ListDetailedCSS.productsWrapper}>
          {status === statuses.SUCCESS && (
            <CartProductsView
              cartProducts={listProducts}
              showGridView={false}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ListDetailed;
