import React from "react";
import { Link } from "react-router-dom";
import ListViewCSS from "./ListView.module.css";

const ListView = ({ data }) => {
  return (
    <div className={ListViewCSS.listViewWrapper}>
      {data.map((item) => {
        return (
          <div key={item.id} className={ListViewCSS.bodyWrapper}>
            <div className={ListViewCSS.listViewImageWrapper}>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} alt="cloth" />
              </Link>
            </div>
            <div className={ListViewCSS.listViewTitleWrapper}>
              <h1>
                <Link to={`/products/${item.id}`}>{item.title}</Link>
              </h1>
            </div>
            <div className={ListViewCSS.listViewPriceWrapper}>
              <h2>Price: {item.price}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
