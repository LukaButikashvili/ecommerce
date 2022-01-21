import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

import Header from "../../components/Header/Header";
import Carusel from "../../components/Carusel/Carusel";
import ProductList from "../../components/ProductList/ProductList";
import { getProductsAction } from "../../redux/product/actions/productActions";
import statuses from "../../config/statuses";

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%; -50%);
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getProductsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <BarLoader css={override} size={150} />
      )}
      {status === statuses.SUCCESS && (
        <>
          <Carusel />
          <ProductList />
        </>
      )}
    </div>
  );
};

export default MainPage;
