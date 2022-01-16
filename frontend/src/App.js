import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Home from './Containers/Home/Home'
import Forum from './Containers/Forum/Forum'
import Profile from './Containers/Profile/Profile'
import { useDispatch } from "react-redux";


function App() {

  
//A METTRE A JOUR POUR ISAUTH
  // export const isEmpty = (value) => {
  //   return (
  //     value === undefined ||
  //     value === null ||
  //     (typeof value === "object" && Object.keys(value).length === 0) ||
  //     (typeof value === "string" && value.trim().length === 0)
  //   );
  // };


  // const dispatch = useDispatch();
  // const isAuth = useSelector(state => state.isAuth)
  // const newAuth = JSON.parse(sessionStorage.getItem("auth"))
  // newAuth != null ? dispatch(!newAuth) :console.log(0);      
         
  const isAuth = true;
  return (
    <>  
      <Routes>
       <Route path="/" element={<Home />}/>
       
       <Route path="/forum" element={isAuth ? <Forum /> : <Navigate to={"/"}/>}/>
       <Route path="/forum/:slug" element={isAuth ? <Forum /> : <Navigate to={"/"}/>}/>
       <Route path="/profile/:slug" element={isAuth ? <Profile /> : <Navigate to={"/"}/>}/>
      </Routes>
    </>
  );
}

export default App;
