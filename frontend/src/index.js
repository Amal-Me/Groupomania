import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./reducer";
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import App from "./App";
import { createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import {getUsers} from "./action";


// const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


// store.dispatch(getUsers());
// console.log(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
