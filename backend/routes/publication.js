//création d'un routeur
const express = require("express");
const router = express.Router();

//importation du chemin comprenant la logique de traitement
const publicationCtrl = require("../controllers/publication");
const auth = require("../middleware/auth");
const authCreator = require("../middleware/authCreator");
const multer = require("../middleware/multer-config");

//chemin d'authentification, de gestion de fichiers entrants et de traitement associé
router.post("/", auth, multer, publicationCtrl.createPublication);
router.post("/comment", auth, multer, publicationCtrl.createComment);
router.post("/like", auth, publicationCtrl.likePublication);
router.delete("/", auth, authCreator, publicationCtrl.deletePublication);
router.delete("/comment", auth, authCreator, publicationCtrl.deleteComment);
module.exports = router;
