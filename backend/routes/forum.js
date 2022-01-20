//création d'un routeur
const express = require("express");
const router = express.Router();

//importation du chemin comprenant la logique de traitement
const forumCtrl = require("../controllers/forum");
const authStream = require("../middleware/authStream");

//chemin d'authentification et de traitement associé

router.get("/stream", authStream, forumCtrl.getStream);
module.exports = router;
