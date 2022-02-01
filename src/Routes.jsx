import React from "react";
import routes from "./config/routes";
import { Route, Routes as ReactRoutes } from "react-router-dom";

import MainPage from "./pages/Main";
import ProductPage from "./pages/Product";
import UsersPage from "./pages/Users";
import UserDetailedPage from "./pages/UserDetailed";
import SavedPage from "./pages/Saved";
import CheckoutPage from "./pages/Checkout";
import NotFoundPage from "./pages/404/404";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path={routes.MAIN_PAGE} element={<MainPage />} />
      <Route path={routes.PRODUCT_PAGE} element={<ProductPage />} />
      <Route path={routes.USERS_PAGE} element={<UsersPage />} />
      <Route path={routes.USER_DETAILED_PAGE} element={<UserDetailedPage />} />
      <Route path={routes.SAVED_PAGE} element={<SavedPage />} />
      <Route path={routes.CHECKOUT} element={<CheckoutPage />} />
      <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
    </ReactRoutes>
  );
};

export default Routes;
