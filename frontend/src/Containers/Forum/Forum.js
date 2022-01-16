import React, { useEffect } from "react";
import "./Forum.css";
import Header from "../../Components/Header/Header";
import Publication from "../../Components/Publication/Publication";
import InputArea from "../../Components/InputArea/InputArea";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../../Components/Utils";
import { getPublications } from "../../action";

export default function Forum() {
  const dispatch = useDispatch();
  const publications = useSelector((state) => state.apiCall);
  useEffect(() => {
    dispatch(getPublications());
    console.log(publications);
  }, []);

  return (
    <>
      <Header />
      <div className="flow">
        {!isEmpty(publications) &&
          publications.map((publication, index) => (
            <Publication publication={publication} key={index} />
          ))}
      </div>
      <InputArea />
    </>
  );
}
