import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

//bandeau d'en-tête
export default function Header() {
  const Navigate = useNavigate();

  const logo = require("../../images/logo.png");
  const user = require("../../images/user.png");
  const deco = require("../../images/deco.png");

  return (
    <>
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <h1>"Une équipe qui échange et communique est toujours meilleure"</h1>
        <div className="nav">
          <img className="user" src={user} alt="user" />
          {/* <a href="http://localhost:3001/profile">Mon profil</a> */}
          <p onClick={() => Navigate("/profile")}>Mon profil</p>
          <img className="deco" src={deco} alt="deconnection" />
          <p
            onClick={() => {
              sessionStorage.clear();
              Navigate("/");
            }}
          >
            Déconnexion
          </p>
        </div>
      </div>
    </>
  );
}
