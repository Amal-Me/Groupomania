import React from "react";
import "./Comment.css";
import { isEmpty } from "../Utils";

export default function Comment({ comment }) {

  const sup = require('../../images/sup.png');

  return (
    <div className="com">
      <div className="Avatar">
        Avatar_Image:
        {!isEmpty(comment) && comment.Users[0].ImageUrl}
        Avatar_Nom:
        {!isEmpty(comment) && comment.Users[0].UserId}
        <p>
          {comment.Temps.slice(0, 10)} {comment.Temps.slice(11, 16)}
        </p>
      </div>
      <p>{comment.Content}</p>
      <button className="supr"><img className="sup" src={sup} alt='sup'/></button>
    </div>
  );
}
