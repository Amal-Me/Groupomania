import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./Profile.css";
//useDispatch pour lancer les actions
import { useDispatch } from "react-redux";
//importation de l'action
import { deleteUser } from "../../action";


//page profil
export default function Profile() {

  const Navigate = useNavigate();
  
  const sup = require("../../images/sup.png");
  const dispatch = useDispatch(); 

  //récupération des infos utilisateur pour sa page profil
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const profiles = JSON.parse(sessionStorage.getItem("Profiles"));
  const profile = profiles.Users.filter((e) => e.UserId === auth.userId);
 

  //gestion d'un state local pour l'ouverture d'un formulaire
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //initialisation d'un state local pour les infos profil
  const [post, setPost] = useState({
    Pseudo: "",
    Name: "",
    FirstName: "",
    DateOfBirth: "",
    Job: "",
  });

  //récupération des données du formulaire
  const handleInputs = (e) => {
    if (e.target.classList.contains("inp-Pseudo")) {
      //création d'un objet avec la mise à jour des infos
      const newObjState = { ...post, Pseudo: e.target.value };
      //mise à jour du state
      setPost(newObjState);
    } else if (e.target.classList.contains("inp-Name")) {
      const newObjState = { ...post, Name: e.target.value };
      setPost(newObjState);
    } else if (e.target.classList.contains("inp-FirstName")) {
      const newObjState = { ...post, FirstName: e.target.value };
      setPost(newObjState);
    } else if (e.target.classList.contains("inp-DateOfBirth")) {
      const newObjState = { ...post, DateOfBirth: e.target.value };
      setPost(newObjState);
    } else if (e.target.classList.contains("inp-Job")) {
      const newObjState = { ...post, Job: e.target.value };
      setPost(newObjState);
    }
  };
  
  //soumission du formulaire
  const handleForm = (e) => {
    const ImgUp = document.querySelector("#imgUp");
    e.preventDefault();
    //construction de la data
    const formData = new FormData();
    formData.append("UserId", auth.userId);
    formData.append("Pseudo", post.Pseudo);
    formData.append("Name", post.Name);
    formData.append("FirstName", post.FirstName);
    formData.append("DateOfBirth", post.DateOfBirth);
    formData.append("Job", post.Job);
    formData.append("image", ImgUp.files[0]);

    const requestOptions = {
      method: "PUT",
      headers: { authorization: `Bearer ${auth.token}` },
      body: formData,
    };
    fetch("http://localhost:3000/api/profile", requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    //réinitialisation du state après envoi
    setPost({
      Pseudo: "",
      Name: "",
      FirstName: "",
      DateOfBirth: "",
      Job: "",
    });
    setTimeout(() => {
      Navigate("/forum");
    }, 500);
    
  };

  //suppression compte
  function confirmation() {
    const conf = window.confirm(
      "Etes-vous sûr de vouloir supprimer définitivement votre compte?"
    );
    if (conf) {
      //envoi de l'action de suppression
      dispatch(deleteUser(auth.userId, profile[0].ImageUrl));
      alert("Votre compte va bien être supprimé");
      //nettoyage des informations et déconnection
      sessionStorage.clear();
      Navigate("/");
    } else {
      alert("La suppression a été annulée");
    }
  }

  return (
    <>
      <Header />
      <div className="profilZone">        
        <img className="profilImg" src={profile[0].ImageUrl} alt="profil_Image" />
        <div className="infoProfil">
          <button className="btn" onClick={() => Navigate("/forum")}>Retour au Forum</button>
        <p>Choisissez un pseudo et une image pour personnaliser votre avatar</p> 
          <p>
            Pseudo: <span>{profile[0].Pseudo}</span>
          </p>
          <p>
            Email: <span>{profile[0].Email}</span>
          </p>
          <p>
            Nom: <span>{profile[0].Name}</span>
          </p>
          <p>
            Prénom: <span>{profile[0].Firstname}</span>
          </p>
          <p>
            Date de naissance: <span>{profile[0].DateOfBirth}</span>
          </p>
          <p>
            Poste: <span>{profile[0].Job}</span>
          </p>
        </div>
      </div>
      {/* bouton d'ouverture du formulaire de modification */}
      <button className="btn" onClick={openModal}>
        Modifier
      </button>
      <button className="supUser" onClick={() => confirmation()}>
        Supprimer le compte
      </button>
      {/* affichage formulaire */}
      {isOpen && (
        <div>
          <div className="modal">
            <div className="textZone1">
              <form onSubmit={handleForm} className="formZone1">
                <label htmlFor="image">Choisissez une image</label>
                <input
                  onInput={handleInputs}
                  value={post.files}
                  type="file"
                  accept="image/*"
                  className="inp-file"
                  id="imgUp"
                />
                <label htmlFor="Pseudo">Pseudo</label>
                <input
                  onInput={handleInputs}
                  value={post.Pseudo}
                  type="textarea"
                  id="Pseudo"
                  placeholder="Ecrivez ici"
                  className="inp-Pseudo"
                />
                <label htmlFor="Nom">Nom</label>
                <input
                  onInput={handleInputs}
                  value={post.Name}
                  type="textarea"
                  id="Name"
                  placeholder="Ecrivez ici"
                  className="inp-Name"
                />
                <label htmlFor="Prenom">Prénom</label>
                <input
                  onInput={handleInputs}
                  value={post.FirstName}
                  type="Number"
                  id="FirstName"
                  placeholder="Ecrivez ici"
                  className="inp-FirstName"
                />
                <label htmlFor="Datedenaissance">Date de naissance</label>
                <input
                  onInput={handleInputs}
                  value={post.DateOfBirth}
                  type="textarea"
                  id="DateOfBirth"
                  placeholder="Ecrivez ici"
                  className="inp-DateOfBirth"
                />
                <label htmlFor="Poste">Poste</label>
                <input
                  onInput={handleInputs}
                  value={post.Job}
                  type="textarea"
                  id="Job"
                  placeholder="Ecrivez ici"
                  className="inp-Job"
                />
                <button className="btn">Publier</button>
              </form>
            </div>
            <button onClick={closeModal} className="supr">
              <img className="sup" src={sup} alt="sup" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
