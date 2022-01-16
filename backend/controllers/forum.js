const fs = require("fs");
const jwt = require("jsonwebtoken");
const db = require("../models/mpd");
const mysql = require("mysql");

exports.getStream = (req, res, next) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });
  const writeEvent = (res, sseId, data, event = 'message') => {
    res.write(`id: ${sseId}\n`);
    res.write(`type: ${event}\n`);
    res.write(`data: ${data}\n\n`);
  };
  const sqlSelect =
    "SELECT * FROM Publication;SELECT * FROM Comment;SELECT * FROM LikePub; SELECT * FROM User;";

  const Streamer = true;
  const SEND_INTERVAL = Streamer ? 2000 : 500;
  setInterval(() => {
    return new Promise((resolve, reject) => {
      db.query(sqlSelect, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    })
      .then((all) => {
        const pub = all[0];
        const com = all[1];
        const like = all[2];
        const user = all[3];
        com.map((i) => {
          const Users = user.filter((e) => e.UserId === i.User_Id);
          const addCom = { Users };
          return Object.assign(i, addCom);
        });
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
        const dataAll = typeof pub === 'object' ? JSON.stringify(pub) : pub;
        return dataAll;
      })
      .then((all) => {
        const connection = [];
        connection.push(res);
        const sseId = new Date().toDateString();
        const event = 'message';
        connection.map((con)=> {
        writeEvent(res, sseId, all); })

        
      });
  }, SEND_INTERVAL);
};

exports.getAllForum = (req, res, next) => {
  const sqlSelect = "SELECT * FROM Publication;";
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  }).then((all) => {
    res.status(200).json(all);
  });
};

// exports.getStream = (req, res, next) => {
//   const writeEvent = (res, sseId, data) => {
//     res.write(`id: ${sseId}\n`);
//     res.write(`data: ${data}\n\n`);
//   };
//   const sendEvent = (req, res) => {
//     res.writeHead(200, {
//       "Cache-Control": "no-cache",
//       Connection: "keep-alive",
//       "Content-Type": "text/event-stream",
//       // "Access-Control-Allow-Origin": "*",
//     });
//     // if (middelwareOn) {
//     //   const sseId = new Date().toDateString();
//     //   writeEvent(res, sseId, JSON.stringify(middelwareOn));
//     // }

//     // const SEND_INTERVAL = 2000;
//     // setInterval(() => {
//     //     const sseId = new Date().toDateString();
//     //     writeEvent(res, sseId, JSON.stringify("ca marche"));
//     //   }, SEND_INTERVAL);

//     const sqlSelect = "SELECT * FROM Publication;SELECT * FROM Comment;SELECT * FROM LikePub; SELECT * FROM User";
//     return new Promise((resolve, reject) => {
//       db.query(sqlSelect, (err, result) => {
//         if (err) return reject(err);
//         console.log(result);
//         return resolve(result);

//       });
//     }).then((all) => {
//       const sseId = new Date().toDateString();
//       writeEvent(res, sseId, JSON.stringify(all));
//     });
//   };
//   if (req.headers.accept === "text/event-stream") {
//     sendEvent(req, res);
//   } else {
//     res.json({ message: "Ok" });
//   }
// };

// exports.createForum = (req,res,next) =>{}
// exports.deleteForum = (req,res,next) =>{}
