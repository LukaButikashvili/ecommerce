import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ModalCSS from "./Modal.module.css";

const ModalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const elRef = useRef();
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    ModalRoot.appendChild(elRef.current);

    return () => ModalRoot.removeChild(elRef.current);
  });

  return createPortal(
    <div className={ModalCSS.overlay_styles}>
      <div className={ModalCSS.modal_wrapper}>{children}</div>
    </div>,
    elRef.current
  );
};

export default Modal;
