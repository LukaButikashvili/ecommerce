import React from "react";
import ListViewCSS from "./ListView.module.css";

const ListView = ({ data }) => {
  return (
    <div className={ListViewCSS.listViewWrapper}>
      {data.map((item) => {
        return (
          <div key={item.id} className={ListViewCSS.bodyWrapper}>
            <div>
              <img src={item.image} alt="cloth" />
            </div>
            <h1>{item.title}</h1>
            <h2>Price: {item.price}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
