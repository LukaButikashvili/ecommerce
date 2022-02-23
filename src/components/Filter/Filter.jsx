import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCategories } from "../../api";
import FilterCSS from "./Filter.module.css";

const Filter = ({ changeState }) => {
  const { products } = useSelector((state) => state.productReducer);

  const [allProducts, setAllProducts] = useState(products);
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState("none");

  useEffect(() => {
    let isMounted = true;

    const getCategories = async () => {
      const data = await fetchCategories();
      if (isMounted) {
        setCategories(data);
      }
    };

    getCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedValue === "none") {
      changeState((prevState) => {
        return { ...prevState, data: allProducts, filtered: selectedValue };
      });
      return;
    }

    const filterState = allProducts.filter(
      (item) => item.category === selectedValue
    );
    changeState((prevState) => {
      return { ...prevState, data: filterState, filtered: selectedValue };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <>
      <div className={FilterCSS.filterWrapper}>
        <select
          name="categories"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option key="none" value="none">
            None
          </option>
          <>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </>
        </select>
      </div>
    </>
  );
};

export default Filter;
