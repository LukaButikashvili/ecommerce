import React from "react";
import Header from "../../components/Header/Header";
import NotFoundPageCSS from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className={NotFoundPageCSS.notFoundPageWrapper}>
        <div>
          <h1>404</h1>
          <h4>Not Found</h4>
          <p>Sorry, but page you are looking for is not found :(</p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
