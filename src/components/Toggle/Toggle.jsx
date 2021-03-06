import React from "react";
import ToggleCSS from "./Toggle.module.css";

const Toggle = ({ showGridView, setShowGridView }) => {
  return (
    <div className={ToggleCSS.toggleWrapper}>
      <h3 className={showGridView ? ToggleCSS.active : ""}>Grid View</h3>
      <div onClick={() => setShowGridView(!showGridView)}>
        <div
          className={
            showGridView ? ToggleCSS.toggleBallLeft : ToggleCSS.toggleBallRight
          }
        ></div>
      </div>
      <h3 className={!showGridView ? ToggleCSS.active : ""}>List View</h3>
    </div>
  );
};

export default Toggle;
