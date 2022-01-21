import React from "react";
import GridViewCSS from "./GridView.module.css";

const GridView = ({ data }) => {
  return (
    <div className={GridViewCSS.gridViewWrapper}>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <div className={GridViewCSS.imageWrapper}>
              <img src={item.image} alt="cloth" />
            </div>
            <h2>{item.title}</h2>
            <h1>Price: {item.price}$</h1>
          </div>
        );
      })}
    </div>
  );
};

export default GridView;
