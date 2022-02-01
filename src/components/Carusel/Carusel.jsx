import React, { useEffect, useState } from "react";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import { useSelector } from "react-redux";

import getRandomElementsFromArray from "../../utils/getRandomElements";
import { RANDOM_PRODUCTS_QUANTITY_IN_CAROUSEL } from "../../config/randomProductsQuantity";
import CaruselCSS from "./Carusel.module.css";

const Carusel = () => {
  const { data } = useSelector((state) => state.productReducer);

  const [randomArray, setRandomArray] = useState([]);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  useEffect(() => {
    const products = [...data];
    if (data.length) {
      const array = getRandomElementsFromArray(
        RANDOM_PRODUCTS_QUANTITY_IN_CAROUSEL,
        products
      );
      setRandomArray(array);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const changeSlide = (event) => {
      if (event.code === "ArrowRight") {
        setCurrentElementIndex((prevState) =>
          prevState === 2 ? 0 : prevState + 1
        );
      }
      if (event.code === "ArrowLeft") {
        setCurrentElementIndex((prevState) =>
          prevState === 0 ? 2 : prevState - 1
        );
      }
    };
    window.addEventListener("keydown", changeSlide, false);
    return () => {
      window.removeEventListener("keydown", changeSlide, false);
    };
  }, []);

  const showPrevSlide = () => {
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

  // useEffect(() => {
  //   if (!randomArray.length) {
  //     return;
  //   }
  //   const timer = setTimeout(() => {
  //     showNextSlide();
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // });

  return (
    <div className={CaruselCSS.carouselWrapper} id="carusel">
      <BiCaretLeft size={80} onClick={() => showPrevSlide()} />
      {randomArray
        .slice(currentElementIndex, currentElementIndex + 1)
        .map((product) => {
          return (
            <div key={product.id}>
              <img
                className={CaruselCSS.carouselImage}
                src={product.image}
                alt="cloth"
              />
              <div>
                <h1>{product.title}</h1>
                <h3>Price: {product.price}$</h3>
              </div>
            </div>
          );
        })}
      <BiCaretRight size={80} onClick={() => showNextSlide()} />
    </div>
  );
};

export default Carusel;
