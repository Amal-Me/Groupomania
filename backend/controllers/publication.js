const db = require("../models/mpd");
const mysql = require("mysql");
//module de gestion de fichiers(File System)
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createPublication = (req, res, next) => {
  //premier segment(HTTP),hôte du serveur(localhost), /images/ et le nom du fichier
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = null;
  }

  const sqlInsert =
    "INSERT INTO Publication (Temps, Content, ImageUrl, User_Id, Forum_Id) VALUES ((now()), ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Content = Content";
  const sqlData = [
    req.body.Content,
    imageUrl,
    req.body.User_Id,
    req.body.Forum_Id,
  ];
  db.query(sqlInsert, sqlData, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  console.table(sqlData);
  return res.status(201).json({ message: "Publication enregistrée" });
};
