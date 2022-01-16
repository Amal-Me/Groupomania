const db = require("../models/mpd");
const mysql = require("mysql");
// import getStream from "../controllers/forum"

module.exports = (req, res, next) => {  
  const Streamer = () => req.route.methods.post ? console.log("Oui") : console.log("Non");  
  Streamer();
  next();
};
