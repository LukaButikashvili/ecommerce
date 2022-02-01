import { useSelector } from "react-redux";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

import Header from "../../components/Header/Header";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import statuses from "../../config/statuses";

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%; -50%);
`;

const ProductPage = () => {
  const { status } = useSelector((state) => state.productReducer);

  return (
    <div>
      <Header />
      {(status === statuses.INITIAL || status === statuses.PENDING) && (
        <BarLoader css={override} size={150} />
      )}
      {status === statuses.SUCCESS && (
        <>
          <ProductDetails />
        </>
      )}
    </div>
  );
};

export default ProductPage;
