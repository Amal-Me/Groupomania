export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const getPublications = () => {
  return (dispatch) => {
    const source = new EventSource("http://localhost:3000/api/forum/stream");
    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });
    return source.addEventListener("message", (e) => {
      const dataAll = JSON.parse(e.data);
      console.log(dataAll);      
      dispatch({ type: GET_PUBLICATIONS, payload: dataAll });       

    });

    // return source.addEventListener('error', (e) => {
    //   console.error('Error: ',  e);
    // });
    // return () => {
    //   source.close();
    // };
  };
};

// fetch ("http://localhost:3000/api/forum/")
//         .then((response) => response.json())
//         .then((response) => {
//             dispatch({type: GET_PUBLICATIONS, payload: response})
//         })
//         .catch((err) => console.log(err));
//     }
export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/profile/")
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: GET_USERS, payload: response });
      })
      .catch((err) => console.log(err));
  };
};

export const increment = (nbr) => {
  return {
    type: "INCREMENT",
    payload: nbr,
  };
};
export const decrement = (nbr) => {
  return {
    type: "DECREMENT",
    payload: nbr,
  };
};
