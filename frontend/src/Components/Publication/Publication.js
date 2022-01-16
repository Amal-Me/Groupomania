import React, { useState } from "react";
import "./Publication.css";
import Comment from "../Comment/Comment";
import { isEmpty } from "../Utils";

export default function Publication({ publication }) {
  const sup = require("../../images/sup.png");
  const like = require("../../images/like.png");

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const [post, setPost] = useState({ Content: "" });

  const handleInputs = (e) => {
    if (e.target.classList.contains("inp-textZone")) {
      const newObjState = { ...post, Content: e.target.value };
      setPost(newObjState);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    const formData = new FormData();
    formData.append("Content", post.Content);
    formData.append("User_Id", auth.userId);
    formData.append("Publication_Id", publication.PublicationId);
    formData.append("Forum_Id", 1);
    console.log(formData);

    const requestOptions = {
      method: "POST",
      headers: { authorization: `Bearer ${auth.token}` },
      body: formData,
    };
    fetch("http://localhost:3000/api/publication/comment", requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setPost({ Content: "" });
  };

  // useEffect(() => {}, []);
  return (
    <div className="pub">
      <div className="Avatar">
        Avatar_Image:
        {!isEmpty(publication) && publication.Users[0].ImageUrl}
        Avatar_Nom:
        {!isEmpty(publication) && publication.Users[0].UserId}
        <p>
          {publication.Temps.slice(0, 10)} {publication.Temps.slice(11, 16)}
        </p>
      </div>

      <div className="visuel">
        <img src={publication.ImageUrl} alt="publication d un visuel" />
      </div>
      <p className="content">{publication.Content}</p>
      <button className="supr">
        <img className="sup" src={sup} alt="sup" />
      </button>

      <div className="likes">
        <img className="like" src={like} alt="like" />{" "}
        {!isEmpty(publication.Likes) && publication.Likes.length}
      </div>

      <div className="coms">
        {!isEmpty(publication.Comments) &&
          publication.Comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
        <button className="btn" onClick={openModal}>
          Commenter
        </button>
        {isOpen && (
          <div>
            <div className="modal">
              <div className="textZone1">
                <form onSubmit={handleForm}>
                  <label htmlFor="textZone">Commentez</label>
                  <input
                    onInput={handleInputs}
                    value={post.Content}
                    type="textarea"
                    id="textZone"
                    placeholder="Ecrivez ici"
                    className="inp-textZone"
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
