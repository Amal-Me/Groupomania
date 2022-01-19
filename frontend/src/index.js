import App from "./App";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//provider à la racine pour que le store contenant les states soit accessible
import { Provider } from "react-redux";
//middleware qui gère l'asynchrone
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
//pour combiner les différents reducers
import rootReducer from "./reducer";
//outil de dévelopement dans le navigateur
import { composeWithDevTools } from "redux-devtools-extension";

//création du store avec les reducers et middlewares associés
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);