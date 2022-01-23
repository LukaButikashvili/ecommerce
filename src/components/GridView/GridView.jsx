import React from "react";
import { Link } from "react-router-dom";
import GridViewCSS from "./GridView.module.css";

const GridView = ({ data }) => {
  return (
    <div className={GridViewCSS.gridViewWrapper}>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <div className={GridViewCSS.imageWrapper}>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} alt="cloth" />
              </Link>
            </div>
            <h2>
              <Link to={`/products/${item.id}`}>{item.title}</Link>
            </h2>
            <h1>Price: {item.price}$</h1>
          </div>
        );
      })}
    </div>
  );
};

export default GridView;
