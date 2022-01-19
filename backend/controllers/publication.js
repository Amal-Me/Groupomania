const db = require("../models/mpd");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createPublication = (req, res, next) => {
  //on vérifie si il y a un fichier joint
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = null;
  }
  //insertion publication dans BDD
  const sqlInsert =
    "INSERT INTO Publication (Temps, Content, ImageUrl, User_Id, Forum_Id) VALUES ((now()), ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Content = Content;";
  const sqlData = [
    req.body.Content,
    imageUrl,
    req.body.User_Id,
    req.body.Forum_Id,
  ];
  db.query(sqlInsert, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Publication enregistrée" });
};

exports.createComment = (req, res, next) => {
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = null;
  }
  //insertion commentaire dans la BDD
  const sqlInsert =
    "INSERT INTO Comment (Temps, Content,ImageUrl, Publication_Id, User_Id) VALUES ((now()), ?, ?, ?,?) ON DUPLICATE KEY UPDATE Temps = Temps;";
  const sqlData = [
    req.body.Content,
    imageUrl,
    req.body.Publication_Id,
    req.body.User_Id,
  ];
  db.query(sqlInsert, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Commentaire enregistré" });
};

exports.likePublication = (req, res, next) => {
  //On vérifie le state du like pour l' insérer ou le supprimer de la table LikePub
  const likeState = req.body.like;
  const sqlOnOff =
    // -1 signifie que l'utilisateur n'est pas dans la table LikePub
    likeState === -1
      ? "INSERT INTO LikePub (Publication_Id, User_Id) VALUES ( ?, ?) ON DUPLICATE KEY UPDATE User_Id = User_Id;"
      : "DELETE FROM LikePub WHERE `Publication_Id` = ? AND `User_Id` = ?;";
  const sqlData = [req.body.Publication_Id, req.body.User_Id];
  db.query(sqlOnOff, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "like modifié" });
};

exports.deletePublication = (req, res, next) => {
  //suppression de l'image sur le serveur si existante
  if (req.body.imageUrl) {
    const filename = req.body.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw err;
      console.log("filename was deleted");
    });
  }
  //suppression de la publication dans la BDD
  const sqlDelete = "DELETE FROM Publication WHERE `PublicationId` = ?;";
  const sqlData = [req.body.PublicationId];
  db.query(sqlDelete, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Publication supprimée !" });
};

exports.deleteComment = (req, res, next) => {
  if (req.body.imageUrl) {
    const filename = req.body.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw err;
      console.log("filename was deleted");
    });
  }
  //suppression du commentaire dans la BDD
  const sqlDelete = "DELETE FROM Comment WHERE `CommentId` = ?;";
  const sqlData = [req.body.CommentId];
  db.query(sqlDelete, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Commentaire supprimé !" });
};
