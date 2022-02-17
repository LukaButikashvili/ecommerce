import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RANDOM_PRODUCTS_QUANTITY_IN_RELATED_PRODUCTS } from "../../config/randomProductsQuantity";

import getRandomElementsFromArray from "../../utils/getRandomElements";
import GridView from "../GridView/GridView";
import RelatedProductsCSS from "./RelatedProducts.module.css";

const RelatedProducts = () => {
  const { products } = useSelector((state) => state.productReducer);
  const { id } = useParams();

  const [randomProducts, setRendomProducts] = useState([]);

  useEffect(() => {
    const filterProducts = products.filter((item) => item.id != id);
    const tempProducts = getRandomElementsFromArray(
      RANDOM_PRODUCTS_QUANTITY_IN_RELATED_PRODUCTS,
      filterProducts
    );
    setRendomProducts(tempProducts);
  }, []);
  return (
    <div>
      <div className={RelatedProductsCSS.relatedProductsHeaderWrapper}>
        <h1>Related Products</h1>
      </div>
      <div className={RelatedProductsCSS.relatedProductsListWrapper}>
        <GridView data={randomProducts} />
      </div>
    </div>
  );
};

export default RelatedProducts;
