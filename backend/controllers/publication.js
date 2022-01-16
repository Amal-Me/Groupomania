const db = require("../models/mpd");
const mysql = require("mysql");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createPublication = (req, res, next) => {
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = null;
  }

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
  const sqlInsert =
    "INSERT INTO Comment (Temps, Content, Publication_Id, User_Id) VALUES ((now()), ?, ?, ?) ON DUPLICATE KEY UPDATE Content = Content;";
  const sqlData = [req.body.Content, req.body.Publication_Id, req.body.User_Id];
  console.log(req.body.Content, req.body.Publication_Id, req.body.User_Id);
  db.query(sqlInsert, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Commentaire enregistré" });
};

exports.likePublication = (req, res, next) => {
  const likeState = req.body.like;
  const sqlOnOff =
    likeState === 1
      ? "INSERT INTO LikePub (Publication_Id, User_Id) VALUES ( ?, ?) ON DUPLICATE KEY UPDATE User_Id = User_Id;"
      : "DELETE FROM LikePub WHERE `Publication_Id` = ? AND `User_Id` = ?;";
  const sqlData = [req.body.Publication_Id, req.body.User_Id];
  db.query(sqlOnOff, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Commentaire enregistré" });
};

exports.deletePublication = (req, res, next) => {
  const filename = req.body.imageUrl.split("/images/")[1];
  fs.unlink(`images/${filename}`, () => {
    const sqlDelete = "DELETE FROM Publication WHERE `PublicationId` = ?;";
    const sqlData = [req.body.PublicationId];
    db.query(sqlDelete, sqlData, (err, res) => {
      if (err) throw err;
    });
    return res.status(201).json({ message: "Publication supprimée !" });
  });
};

exports.deleteComment = (req, res, next) => {
  const sqlDelete = "DELETE FROM Comment WHERE `CommentId` = ?;";
  const sqlData = [req.body.CommentId];
  db.query(sqlDelete, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Commentaire supprimée !" });
};
