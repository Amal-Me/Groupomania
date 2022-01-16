import React, { useState } from "react";
import "./InputArea.css";

export default function InputArea() {  
  const [post, setPost] = useState({ Content: "" });

  const handleInputs = (e) => {
    if (e.target.classList.contains("inp-textZone")) {
      const newObjState = { ...post, Content: e.target.value };
      setPost(newObjState);
    }
  };

  const ImgUp = document.querySelector("#imgUp");
  const handleForm = (e) => {
    e.preventDefault();
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    const formData = new FormData();
    formData.append("Content", post.Content);
    formData.append("image", ImgUp.files[0]);
    formData.append("User_Id", auth.userId);
    formData.append("Forum_Id", 1);

    const requestOptions = {
      method: "POST",
      headers: { authorization: `Bearer ${auth.token}` },
      body: formData,
    };
    fetch("http://localhost:3000/api/publication/", requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setPost({ Content: "" });
  };

  return (
    <div className="textZone">
      <form onSubmit={handleForm}>
        <label htmlFor="textZone">Zone de saisie</label>
        <input 
          onInput={handleInputs}
          value={post.Content}
          type="textarea"          
          id="textZone"
          placeholder="Ecrivez ici"
          className="inp-textZone"
        />

        <label htmlFor="image">Choisissez une image</label>
        <input
          onInput={handleInputs}
          value={post.files}
          type="file"
          accept="image/*"
          className="inp-file"
          id="imgUp"
        />

        <button className="btn">Publier</button>
      </form>
    </div>
  );
}
