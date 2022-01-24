import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import getRandomElementsFromArray from "../../utils/getRandomElements";
import GridView from "../GridView/GridView";
import RelatedProductsCSS from "./RelatedProducts.module.css";

const RELATED_PRODUCTS_QUANTITY = 5;
const RelatedProducts = () => {
  const { data } = useSelector((state) => state.productReducer);
  const { id } = useParams();

  const [randomProducts, setRendomProducts] = useState([]);

  useEffect(() => {
    const filterProducts = data.filter((item) => item.id != id);
    const products = getRandomElementsFromArray(
      RELATED_PRODUCTS_QUANTITY,
      filterProducts
    );
    setRendomProducts(products);
  }, []);
  return (
    <div>
      <div className={RelatedProductsCSS.relatedProductsHeaderWrapper}>
        <h1>Related Products</h1>
      </div>
      <GridView data={randomProducts} />
    </div>
  );
};

export default RelatedProducts;
