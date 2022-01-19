const fs = require("fs");
const db = require("../models/mpd");

//récupération des infos profil
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

//modifications des info profil
exports.modifyProfile = (req, res, next) => {
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = null;
  }
  const sqlUpdate =
    "UPDATE User SET Pseudo = ?, Name = ?, FirstName = ?, DateOfBirth = ?, Job = ?, ImageUrl = ? WHERE UserId = ?;";
  const sqlData = [
    req.body.Pseudo,
    req.body.Name,
    req.body.FirstName,
    req.body.DateOfBirth,
    req.body.Job,
    imageUrl,
    req.body.UserId,
  ];
  db.query(sqlUpdate, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Profil modifié" });
};

//suppression du compte dans la BDD
exports.deleteProfile = (req, res, next) => {
  if (req.body.imageUrl) {
    const filename = req.body.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw err;
      console.log("filename was deleted");
    });
  }
  const sqlDelete = "DELETE FROM User WHERE `UserId` = ?;";
  const sqlData = [req.body.UserId];
  db.query(sqlDelete, sqlData, (err, res) => {
    if (err) throw err;
  });
  return res.status(201).json({ message: "Profil supprimé !" });
};
