import React, { useEffect, useState } from "react";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import { useSelector } from "react-redux";

import getRandomElementsFromArray from "../../utils/getRandomElements";
import CaruselCSS from "./Carusel.module.css";

const PRODUCTS_QUANTITY_ON_CARUSEL = 3;

const Carusel = () => {
  const { data } = useSelector((state) => state.productReducer);

  const [randomArray, setRandomArray] = useState([]);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  useEffect(() => {
    if (data.length) {
      const array = getRandomElementsFromArray(
        PRODUCTS_QUANTITY_ON_CARUSEL,
        data
      );
      setRandomArray(array);
    }
  }, [data]);

  const showToPrevSlide = () => {
    if (currentElementIndex === 0) {
      setCurrentElementIndex(2);
      return;
    }

    setCurrentElementIndex((prevState) => prevState - 1);
  };

  const showNextSlide = () => {
    if (currentElementIndex === 2) {
      setCurrentElementIndex(0);
      return;
    }

    setCurrentElementIndex((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (!randomArray.length) {
      return;
    }
    const timer = setTimeout(() => {
      showNextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {randomArray
        .slice(currentElementIndex, currentElementIndex + 1)
        .map((product) => {
          return (
            <div
              key={product.id}
              className={CaruselCSS.caruselWrapper}
              style={{ backgroundImage: `url(${product.image})` }}
            >
              <BiCaretLeft size={80} onClick={() => showToPrevSlide()} />
              <div>
                <h1>{product.title}</h1>
                <h3>Price: {product.price}$</h3>
              </div>
              <BiCaretRight size={80} onClick={() => showNextSlide()} />
            </div>
          );
        })}
    </>
  );
};

export default Carusel;
