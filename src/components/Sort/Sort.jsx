import React, { useEffect, useState } from "react";
import SortCSS from "./Sort.module.css";

const Sort = ({ filteredData, changeState }) => {
  const [selectedValue, setSelectedValue] = useState("none");

  useEffect(() => {
    const products = [...filteredData.data];
    if (selectedValue === "ascending") {
      const tempData = products.sort((a, b) => {
        return a.price - b.price;
      });
      changeState((prevState) => {
        return { ...prevState, data: tempData, sorted: "ascending" };
      });
    }

    if (selectedValue === "decending") {
      const tempData = products.sort((a, b) => {
        return b.price - a.price;
      });
      changeState((prevState) => {
        return { ...prevState, data: tempData, sorted: "decending" };
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, filteredData.filtered]);

  return (
    <div className={SortCSS.sortWrapper}>
      <select
        name="sort"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <option value="none">Default</option>
        <option value="ascending">Price: Low to High</option>
        <option value="decending">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
