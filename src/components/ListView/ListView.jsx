import React from "react";
import { Link } from "react-router-dom";
import ListViewCSS from "./ListView.module.css";

const ListView = ({ data }) => {
  return (
    <div className={ListViewCSS.listViewWrapper}>
      {data.map((item) => {
        return (
          <div key={item.id} className={ListViewCSS.bodyWrapper}>
            <div>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} alt="cloth" />
              </Link>
            </div>
            <h1>
              <Link to={`/products/${item.id}`}>{item.title}</Link>
            </h1>
            <h2>Price: {item.price}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
