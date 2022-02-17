import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import Carusel from "../../components/Carusel/Carusel";
import ProductList from "../../components/ProductList/ProductList";
import statuses from "../../config/statuses";
import Loader from "../../components/Loader/Loader";
import SearchBox from "../../components/Searchbox/Searchbox";
import Filter from "../../components/Filter/Filter";
import MainCSS from "./Main.module.css";
import Sort from "../../components/Sort/Sort";
import AddProduct from "../../components/AddProduct/AddProduct";

const MainPage = () => {
  const { status, products } = useSelector((state) => state.productReducer);

  const [state, setState] = useState({
    data: [],
    sorted: "none",
    filtered: "none",
  });

  useEffect(() => {
    const localstorageData = JSON.parse(localStorage.getItem("products")) || [];

    setState({
      data: [...products, ...localstorageData],
      sorted: "none",
      filtered: "none",
    });
  }, [products]);

  return (
    <div>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <Loader />
      )}
      {status === statuses.SUCCESS && (
        <div className={MainCSS.MainBodyWrapper}>
          <Carusel />
          <div className={MainCSS.filtersWrapper}>
            <SearchBox data={state.data} linkPath="products" />
            <Filter changeState={setState} />
            <Sort filteredData={state} changeState={setState} />
            <AddProduct state={state} setState={setState} />
          </div>
          <ProductList data={state.data} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
