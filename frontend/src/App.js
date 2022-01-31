import React from "react";
import "./App.css";
import Home from "./Containers/Home/Home";
import Forum from "./Containers/Forum/Forum";
import Profile from "./Containers/Profile/Profile";
import { Routes, Route, useNavigate } from "react-router-dom";
import { isEmpty } from "./Components/Utils";

function App() {
  
  //vérification de l'existence d'un token pour autoriser le routage
  const Navigate = useNavigate();
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  let isAuth;
  !isEmpty(auth) &&
    (auth.token === undefined ? (isAuth = false) : (isAuth = true));

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/forum"
          element={
            //empêche la navigation si pas authentifié
            !isEmpty(isAuth) && isAuth ? <Forum /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/profile"
          element={
            !isEmpty(isAuth) && isAuth ? <Profile /> : <Navigate to={"/"} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
