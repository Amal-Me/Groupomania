//création d'un routeur
const express = require("express");
const router = express.Router();

//importation du chemin comprenant la logique de traitement
const profileCtrl = require("../controllers/profile");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//chemin d'authentification, de gestion de fichiers entrants et de traitement associé
router.get("/", auth, profileCtrl.getProfile);
router.put("/", auth, multer, profileCtrl.modifyProfile);
router.delete("/", auth, profileCtrl.deleteProfile);

module.exports = router;
