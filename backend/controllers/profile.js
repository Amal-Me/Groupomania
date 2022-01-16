const fs = require("fs");
const jwt = require("jsonwebtoken");
const db = require("../models/mpd");

exports.getProfile = (req, res, next) => {
  const sqlSelect = "SELECT * FROM User;";
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  }).then((all) => {
    res.status(200).json(all);
  });
};

exports.modifyProfile = (req, res, next) => {
  const profileObject = req.file
    ? {
        ...JSON.parse(req.body),
        ImageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  const sqlUpdate =
    "UPDATE User SET Pseudo = ?, Name = ?, FirstName = ?, DateOfBirth = ?, Phone = ?, Job = ?, ImageUrl = ?, Role_Id = ?, WHERE UserId = ?";
  const sqlData = [
    req.body.Pseudo,
    req.body.Name,
    req.body.FirstName,
    req.body.DateOfBirth,
    req.body.Phone,
    req.body.Job,
    req.body.ImageUrl,
    req.body.Role_Id,
    req.body.UserId,
  ];
  db.query(sqlUpdate, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Profil modifié" });
};

exports.deconnectProfile = (req, res, next) => {};
exports.deleteProfile = (req, res, next) => {
  const sqlDelete = "DELETE FROM User WHERE `UserId` = ?;";
  const sqlData = [req.body.UserId];
  db.query(sqlDelete, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Profil supprimé !" });
};

