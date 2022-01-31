import React, { useState } from "react";
import "./Signup.css";
import { verifInput } from "../Utils";

//inscription
export default function Signup() {
  //initialisation du state local
  const [sign, setSign] = useState({
    email: "",
    password: "",
    passwordbis: "",
  });

  //soumission formulaire
  const handleForm = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sign),
    };
    //conditions de vérifications REGEX avant envoi
    if (verifInput()) {
      fetch("http://localhost:3000/api/auth/signup", requestOptions)
        .then((response) => response.json())
        .catch((err) => console.log(err));

      alert("Votre compte a bien été créé, vous pouvez vous connecter");
    }

    //réinitialisation du state après envoi
    setSign({
      email: "",
      password: "",
      passwordbis: "",
    });
  };

  //récupération des données du formulaire
  const handleInputs = (e) => {
    if (e.target.classList.contains("inp-email")) {
      //création d'un objet avec la mise à jour des infos
      const newObjState = { ...sign, email: e.target.value };
      //mise à jour du state
      setSign(newObjState);
    } else if (e.target.classList.contains("inp-password")) {
      const newObjState = { ...sign, password: e.target.value };
      setSign(newObjState);
    } else if (e.target.classList.contains("inp-passwordbis")) {
      const newObjState = { ...sign, passwordbis: e.target.value };
      setSign(newObjState);
    }
  };

  return (
    <div className="Sign">
      <h2>Inscription</h2>
      <br />
      <form className="signForm" onSubmit={handleForm}>
        <label htmlFor="Email">Email</label>
        <br />
        <input
          onInput={handleInputs}
          value={sign.email}
          type="email"
          id="Email"
          placeholder="Entrez votre Email"
          className="inp-email"
        />
        <p id="emailErrorMsg"></p>
        <br />
        <br />
        <label htmlFor="Motdepasse">Mot de passe</label>
        <br />
        <input
          onInput={handleInputs}
          value={sign.password}
          type="password"
          id="Motdepasse"
          placeholder="Entrez un mot de passe"
          className="inp-password"
        />
        <p id="MotdepasseErrorMsg"></p>
        <br />
        <br />
        <label htmlFor="Motdepassebis">Mot de passe</label>
        <br />
        <input
          onInput={handleInputs}
          value={sign.passwordbis}
          type="password"
          id="Motdepassebis"
          placeholder="Entrez à nouveau votre mot de passe"
          className="inp-passwordbis"
        />
        <p id="MotdepassebisErrorMsg"></p>
        <br />
        <br />
        <button className="btn">Valider</button>
      </form>
    </div>
  );
}
