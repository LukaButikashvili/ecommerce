import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { getProductsAction } from "./redux/product/actions/productActions";
import { getUsersAction } from "./redux/user/actions/userActions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction());
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
