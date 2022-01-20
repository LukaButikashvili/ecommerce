import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import { getProductsAction } from "../../redux/product/actions/productActions";

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      {/* <h1>Hello from MainPage</h1> */}
    </div>
  );
};

export default MainPage;
