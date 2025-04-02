import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./Login.css";
import { API_BASE_URL } from "../../config.js";

//connection
export default function Login() {
  const Navigate = useNavigate();
  //initialisation du state local
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  //soumission formulaire
  const handleForm = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    };
    fetch(`${API_BASE_URL}/api/auth/login`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        sessionStorage.setItem("auth", JSON.stringify(response));
        Navigate ("/forum");
      })
      .catch((err) => {
        console.log(err);
      });
    //réinitialisation du state après envoi
    setLogin({
      email: "",
      password: "",
    });
  };

  //récupération des données du formulaire
  const handleInputs = (e) => {
    if (e.target.classList.contains("inp-email")) {
      const newObjState = { ...login, email: e.target.value };
      setLogin(newObjState);
    } else if (e.target.classList.contains("inp-password")) {
      const newObjState = { ...login, password: e.target.value };
      setLogin(newObjState);
    }
  };

  return (
    <div className="log">
      <h2>Connexion</h2>
      <br />
      <form className="logForm" onSubmit={handleForm}>
        <label htmlFor="Email"> Email</label>
        <br />
        <input
          onInput={handleInputs}
          value={login.email}
          type="email"
          id="Email"
          placeholder="Entrez votre Email"
          className="inp-email"
        />
        <br />
        <br />
        <label htmlFor="Motdepasse">Mot de passe</label>
        <br />
        <input
          onInput={handleInputs}
          value={login.password}
          type="password"
          id="Motdepasse"
          placeholder="Entrez un mot de passe"
          className="inp-password"
        />
        <br />
        <br />
        <button className="btn">Valider</button>
      </form>
    </div>
  );
}
