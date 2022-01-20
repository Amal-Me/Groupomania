//action de réception SSE
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const getPublications = () => {
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  return (dispatch) => {
    //on initialise la source et on écoute ?Id=" + auth.userId + "&Token=" + auth.token
    const source = new EventSource("http://localhost:3000/api/forum/stream/?Id=" + auth.userId + "&Token=" + auth.token,);
    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });
    //récupération des datas et transfert au store via les reducers
    return source.addEventListener("message", (e) => {
      sessionStorage.setItem("Profiles", e.data);
      const dataAll = JSON.parse(e.data);
      console.log("raffraichissement SSE");
      dispatch({ type: GET_PUBLICATIONS, payload: dataAll });
    });
  };
};

//action de suppression publication via FETCH delete
export const DELETE_PUBLICATION = "DELETE_PUBLICATION";
export const deletePublication = (data1, data2, data3) => {
  const data = {
    PublicationId: data1,
    User_Id: data2,
    imageUrl: data3,
  };
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const requestOptions = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return (dispatch) => {
    return fetch("http://localhost:3000/api/publication/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: DELETE_PUBLICATION, payload: response });
      })
      .catch((err) => console.log(err));
  };
};

//action de suppression commentaire via FETCH delete
export const DELETE_COMMENT = "DELETE_COMMENT";
export const deleteComment = (data1, data2, data3) => {
  const data = {
    CommentId: data1,
    User_Id: data2,
    imageUrl: data3,
  };
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const requestOptions = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return (dispatch) => {
    return fetch(
      "http://localhost:3000/api/publication/comment/",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: DELETE_COMMENT, payload: response });
      })
      .catch((err) => console.log(err));
  };
};

//action de suppression utilisateur via FETCH delete
export const DELETE_USER = "DELETE_USER";
export const deleteUser = (data1, data2) => {
  const data = {
    UserId: data1,
    imageUrl: data2,
  };
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const requestOptions = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return (dispatch) => {
    return fetch("http://localhost:3000/api/profile/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: DELETE_USER, payload: response });
      })
      .catch((err) => console.log(err));
  };
};

//envoi du statut du like pour modification
export const LIKE_STATE = "LIKE_STATE";
export const likeModify = (data1, data2, data3) => {
  const data = {
    Publication_Id: data1,
    User_Id: data2,
    like: data3,
  };
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const requestOptions = {
    method: "POST",
    headers: {
      authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return (dispatch) => {
    return fetch("http://localhost:3000/api/publication/like", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: LIKE_STATE, payload: response });
      })
      .catch((err) => console.log(err));
  };
};
