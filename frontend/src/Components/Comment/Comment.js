import React from "react";
import "./Comment.css";
import { isEmpty } from "../Utils";
import { deleteComment } from "../../action";
//useDispatch pour lancer les actions
import { useDispatch } from "react-redux";

//affichage commentaire
export default function Comment({ comment }) {
  const dispatch = useDispatch();
  const sup = require("../../images/sup.png");

  return (
    <div className="com">
      {/* création avatar */}
      <div className="Avatar">
        {!isEmpty(comment) && (
          <img
            className="avatarImg"
            src={comment.Users[0].ImageUrl}
            alt="Avatar: "
          />
        )}
        {/* récupération du pseudo ou email */}
        {!isEmpty(comment) &&
          (comment.Users[0].Pseudo || comment.Users[0].Email)}
        <p>
          {/* affichage date/heure */}
          {comment.Temps.slice(0, 10)} {comment.Temps.slice(11, 16)}
        </p>
      </div>
      {!isEmpty(comment.ImageUrl) && (
        <div className="visuel">
          <img src={comment.ImageUrl} alt="publication d un visuel" />
        </div>
      )}
      <p>{comment.Content}</p>
      <button
        className="supr"
        onClick={() =>
          dispatch(
            // lancement de l'action suppression commentaire
            deleteComment(comment.CommentId, comment.User_Id, comment.ImageUrl)
          )
        }
      >
        <img className="sup" src={sup} alt="sup" />
      </button>
    </div>
  );
}