import React, { useState } from "react";
import "./Publication.css";
import Comment from "../Comment/Comment";
import { isEmpty } from "../Utils";
//useDispatch pour lancer les actions
import { useDispatch } from "react-redux";
import { deletePublication } from "../../action";
import { likeModify } from "../../action";

export default function Publication({ publication }) {
  const dispatch = useDispatch();

  const sup = require("../../images/sup.png");
  const like = require("../../images/like.png");
  const likeR = require("../../images/likeR.png");

  //gestion d'un state local pour l'ouverture d'un formulaire
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //initialisation d'un state local pour les commentaires
  const [postc, setPostc] = useState({ Content: "", files: "" });

  //récupération des données du formulaire
  const handleInputs = (e) => {
    if (e.target.classList.contains("inp-textZone")) {
      //création d'un objet avec la mise à jour des infos
      const newObjState = { ...postc, Content: e.target.value };
      //mise à jour du state
      setPostc(newObjState);
    } else if (e.target.classList.contains("inp-file")) {
      const newObjState = { ...postc, files: e.target.value };
      setPostc(newObjState);
    }
  };

  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const ImgUp = document.querySelector("#imgUp");
  //soumission du formulaire du commentaire
  const handleForm = (e) => {
    e.preventDefault();
    //construction de la data
    const formData = new FormData();
    formData.append("Content", postc.Content);
    formData.append("image", ImgUp.files[0]);
    formData.append("User_Id", auth.userId);
    formData.append("Publication_Id", publication.PublicationId);

    const requestOptions = {
      method: "POST",
      headers: { authorization: `Bearer ${auth.token}` },
      body: formData,
    };
    console.log(requestOptions);
    fetch("http://localhost:3000/api/publication/comment", requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    //réinitialisation du state après envoi
    setPostc({ Content: "", files: "" });
  };

  return (
    <div className="pub">
      <div className="bl">
        {/* création avatar */}
        <div className="Avatar">
          {!isEmpty(publication) && (
            <img
              className="avatarImg"
              src={publication.Users[0].ImageUrl}
              alt="Avatar: "
            />
          )}
          {/* récupération du pseudo ou email */}
          {!isEmpty(publication) &&
            (publication.Users[0].Pseudo || publication.Users[0].Email)}
          <p>
            {/* affichage date/heure */}
            {publication.Temps.slice(0, 10)} {publication.Temps.slice(11, 16)}
          </p>
        </div>

        <button
          className="likes"
          onClick={() =>
            dispatch(
              // lancement de l'action like
              likeModify(
                // récupération des paramètres nécessaires au like
                publication.PublicationId,
                auth.userId,
                publication.Likes.findIndex((i) => i.User_Id === auth.userId)
              )
            )
          }
        >
          <img
            className="like"
            src={
              // changement de la couleur en fonction de l'état du like
              publication.Likes.findIndex((i) => i.User_Id === auth.userId) < 0
                ? like
                : likeR
            }
            alt="like"
          />
          {/* affichage du nombre de likes */}
          {!isEmpty(publication.Likes) && publication.Likes.length}
        </button>
        <button
          className="supr suprpub"
          onClick={() =>
            dispatch(
              // lancement de l action suppression publication
              deletePublication(
                publication.PublicationId,
                publication.User_Id,
                publication.ImageUrl
              )
            )
          }
        >
          <img className="sup" src={sup} alt="sup" />
        </button>
      </div>
      {!isEmpty(publication.ImageUrl) && (
        <div className="visuel">
          <img src={publication.ImageUrl} alt="publication d un visuel" />
        </div>
      )}
      <p className="content">{publication.Content}</p>

      <div className="coms">
        {/* attente de la variable stream qui récupère le state de l'action */}
        {!isEmpty(publication.Comments) &&
          // création des balises commentaires avec leurs props
          publication.Comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
        {/* bouton d'ouverture du formulaire de modification */}
        <button className="btn" onClick={openModal}>
          Commenter
        </button>
        {/* affichage formulaire */}
        {isOpen && (
          <div>
            <div className="modal">
              <div className="textZone1">
                <form onSubmit={handleForm}>
                  <label htmlFor="textZone">Commentez</label>
                  <input
                    onInput={handleInputs}
                    value={postc.Content}
                    type="textarea"
                    id={publication.PublicationId}
                    placeholder="Ecrivez ici"
                    className="inp-textZone"
                  />
                  <label htmlFor="image">Choisissez une image</label>
                  <input
                    onInput={handleInputs}
                    value={postc.files}
                    type="file"
                    accept="image/*"
                    className="inp-file"
                    id="imgUp"
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
      </div>
    </div>
  );
}
