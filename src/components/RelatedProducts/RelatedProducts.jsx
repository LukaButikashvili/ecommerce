import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RANDOM_PRODUCTS_QUANTITY_IN_RELATED_PRODUCTS } from "../../config/randomProductsQuantity";

import getRandomElementsFromArray from "../../utils/getRandomElements";
import GridView from "../GridView/GridView";
import RelatedProductsCSS from "./RelatedProducts.module.css";

const RelatedProducts = () => {
  const { data } = useSelector((state) => state.productReducer);
  const { id } = useParams();

  const [randomProducts, setRendomProducts] = useState([]);

  useEffect(() => {
    const filterProducts = data.filter((item) => item.id != id);
    const products = getRandomElementsFromArray(
      RANDOM_PRODUCTS_QUANTITY_IN_RELATED_PRODUCTS,
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
