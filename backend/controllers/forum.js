const fs = require("fs");
const db = require("../models/mpd");

//SSE pour mise à jour du contenu
exports.getStream = (req, res, next) => {
  //configuration de l'en-tête pour préciser le type et garder la connection ouverte
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });
  //configuration des données de la réponse
  const writeEvent = (res, sseId, data, event = "message") => {
    res.write(`id: ${sseId}\n`);
    res.write(`type: ${event}\n`);
    res.write(`data: ${data}\n\n`);
  };
  //sélection des tables nécessaires
  const sqlSelect =
    "SELECT * FROM Publication;SELECT * FROM Comment;SELECT * FROM LikePub; SELECT * FROM User;";
  //fréquence de mise à jour
  const SEND_INTERVAL = 2000;
  setInterval(() => {
    return new Promise((resolve, reject) => {
      db.query(sqlSelect, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    })
      .then((all) => {
        //répartition des tables pour traitement
        const pub = all[0];
        const com = all[1];
        const like = all[2];
        const user = all[3];
        //association du créateur à son commentaire dans un objet 
        com.map((i) => {
          const Users = user.filter((e) => e.UserId === i.User_Id);
          const addCom = { Users };
          return Object.assign(i, addCom);
        });
        //association du créateur de la publication ainsi que les likes et les commentaires associés à celle ci dans un objet 
        pub.map((i) => {
          const Comments = com.filter(
            (e) => e.Publication_Id === i.PublicationId
          );
          const Likes = like.filter(
            (e) => e.Publication_Id === i.PublicationId
          );
          const Users = user.filter((e) => e.UserId === i.User_Id);
          const addPub = { Comments, Likes, Users };
          return Object.assign(i, addPub);
        });
        const dataAll = JSON.stringify({ Publications: pub, Users: user });
        return dataAll;
      })
      .then((all) => {
        //création d'un tableau connection pour enregistrer toutes les connections 
        const connections = [];
        connections.push(res);
        const sseId = new Date().toDateString();
        const event = "message";
        //distribution des mises à jour à toutes les connections
        connections.map((connect) => {
          writeEvent(connect, sseId, all);
        });
      });
  }, SEND_INTERVAL);
};