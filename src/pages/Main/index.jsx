import React from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import Carusel from "../../components/Carusel/Carusel";
import ProductList from "../../components/ProductList/ProductList";
import statuses from "../../config/statuses";
import Loader from "../../components/Loader/Loader";

const MainPage = () => {
  const { status } = useSelector((state) => state.productReducer);

  return (
    <div>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <Loader />
      )}
      {status === statuses.SUCCESS && (
        <>
          <Carusel />
          <ProductList />
        </>
      )}
    </div>
  );
};

export default MainPage;
