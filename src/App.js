import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import store from "./redux/store";
import { getProductsAction } from "./redux/product/actions/productActions";

store.dispatch(getProductsAction());

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Router>
  );
}

export default App;
