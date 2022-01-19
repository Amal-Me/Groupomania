//utilisation de bcrypt pour crypter les données
const bcrypt = require("bcrypt");
//importation du model User
const db = require("../models/mpd");
//jeton permettant d’échanger des informations de manière sécurisée
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = (req, res, next) => {
  //chiffrement du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // création utilisateur
      const sqlInsertUser =
        "INSERT INTO User (Email, Password, Pseudo) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Email = Email";

      //enregistrement dans la table User de la BDD
      db.query(
        sqlInsertUser,
        [req.body.email, hash, req.body.pseudo],
        (err, res) => {
          if (err) throw err;
          console.table(res);
        }
      );
      console.table([req.body.email, hash, req.body.pseudo]);
    })
    .then(() => res.status(201).json({ message: "Utilisateur enregistré" }))
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const sqlSelectUser =
    "SELECT * FROM User WHERE Email = '" + req.body.email + "';";
  return new Promise((resolve, reject) => {
    db.query(sqlSelectUser, (err, result) => {
      if (err) return reject(err);
      return resolve(result[0]);
    });
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      //comparaison des mots de passe
      bcrypt
        .compare(req.body.password, user.Password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          //renvoi du user et du token au front
          res.status(200).json({
            userId: user.UserId,
            Pseudo: user.Pseudo,
            Email: user.Email,
            Name: user.Name,
            FirstName: user.FirstName,
            DateOfBirth: user.DateOfBirth,
            Phone: user.Phone,
            Job: user.Job,
            ImageUrl: user.ImageUrl,
            token: jwt.sign(
              //encodage du token
              { userId: user.UserId },
              process.env.TOKEN_KEY,
              { expiresIn: "24h" }
            ),
          });
          const sqlInsertConnect =
          //assignation d un Id de forum par défaut(dans l'attente d'une création multi forums)
            "INSERT INTO Connection (User_Id, Forum_Id) VALUES (?, ?) ON DUPLICATE KEY UPDATE User_Id = User_Id";
          db.query(sqlInsertConnect, [user.UserId, 1], (err, res) => {
            if (err) throw err;
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};