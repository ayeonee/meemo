import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";
import reducer from "./_userReducers";
import reportWebVitals from "./reportWebVitals";
import "./styles/reset.module.scss";

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWidthMiddleware(
        reducer,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
