import React from "react";
import "./Header.css";

//bandeau d'en-tête
export default function Header() {
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
          <a href="http://localhost:3001/profile">Mon profil</a>
          <img className="deco" src={deco} alt="deconnection" />
          <a
            href="http://localhost:3001/"
            // a la deconnection nettoyage du storage
            onClick={() => sessionStorage.clear()}
          >
            Déconnexion
          </a>
        </div>
      </div>
    </>
  );
}
