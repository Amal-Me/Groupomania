import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import "./Signup.css";

export default function Signup() {
  const [sign, setSign] = useState({
    email: "",
    password: "",
    passwordbis: "",
  });

  const handleForm = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sign),
    };
    fetch("http://localhost:3000/api/auth/signup", requestOptions)
      .then((response) => response.json())
      .catch((err) => console.log(err));

    setSign({
      email: "",
      password: "",
      passwordbis: "",
    });
  };

  const handleInputs = (e) => {
    if (e.target.classList.contains("inp-email")) {
      const newObjState = { ...sign, email: e.target.value };
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
      <form className="signForm"  onSubmit={handleForm}>
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
        <br /><br />
        <label htmlFor="Motdepasse">Mot de passe</label>
        <br />
        <input
          onInput={handleInputs}
          value={sign.password}
          type="text"
          id="Motdepasse"
          placeholder="Entrez un mot de passe"
          className="inp-password"
        />
        <br /><br />
        <label htmlFor="Motdepassebis">Mot de passe</label>
        <br />
        <input
          onInput={handleInputs}
          value={sign.passwordbis}
          type="text"
          id="Motdepassebis"
          placeholder="Entrez à nouveau votre mot de passe"
          className="inp-passwordbis"
        />
        <br /><br />
        <button>Valider</button>
      </form>
    </div>
  );
}
