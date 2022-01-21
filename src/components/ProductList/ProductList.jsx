import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductListCSS from "./ProductList.module.css";
import GridView from "../GridView/GridView";
import ListView from "../ListView/ListView";
import Toggle from "../Toggle/Toggle";

const ProductList = () => {
  const { data } = useSelector((state) => state.productReducer);

  const [showGridView, setShowGridView] = useState(true);

  return (
    <div>
      <div className={ProductListCSS.productListTitleWrapper}>
        <h1>Products</h1>
        <Toggle showGridView={showGridView} setShowGridView={setShowGridView} />
      </div>
      {showGridView ? <GridView data={data} /> : <ListView data={data} />}
    </div>
  );
};

export default ProductList;
