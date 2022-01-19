import React, { useEffect } from "react";
import "./Forum.css";
import Header from "../../Components/Header/Header";
import Publication from "../../Components/Publication/Publication";
import InputArea from "../../Components/InputArea/InputArea";
//useSelector pour récupérer le state dans le store et useDispatch pour lancer l action
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../../Components/Utils";
import { getPublications } from "../../action";

//page principale
export default function Forum() {
  const dispatch = useDispatch();
  //lancement de l'action SSE pour affichage des publications
  const Stream = useSelector((state) => state.apiCall);
  //lancement de l'action une seule fois pour activer la source
  useEffect(() => {
    dispatch(getPublications());
  }, []);

  return (
    <>
      <Header />
      <div className="flow">
        {/* attente de la variable stream qui récupère le state de l'action */}
        {!isEmpty(Stream) &&
          // création des balises publication avec leurs props
          Stream.Publications.map((publication, index) => (
            <Publication publication={publication} key={index} />
          ))}
      </div>
      <InputArea />
    </>
  );
}
