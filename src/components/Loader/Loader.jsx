import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%; -50%);
`;

const Loader = () => {
  return <BarLoader css={override} size={150} />;
};

export default Loader;
