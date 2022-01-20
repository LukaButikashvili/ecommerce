import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
