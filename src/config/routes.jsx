const routes = {
  MAIN_PAGE: "/",
  USERS_PAGE: "/users",
  USER_DETAILED_PAGE: "/users/:id",
  PRODUCT_PAGE: "/products/:id",
  SAVED_PAGE: "/saved",
  CHECKOUT: "/checkout",
  LISTS: "/lists",
  LISTSDETAILED: "/lists/:listName",
  DIFF: "/diff/*",
  DIFFCOMPARE: ":userId",
  NOT_FOUND: "*",
};

export default routes;
