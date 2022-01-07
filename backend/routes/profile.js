//création d'un routeur 
const express   = require('express');
const router    = express.Router();

//importation du chemin comprenant la logique de traitement
const profileCtrl = require('../controllers/profile');
const auth      = require('../middleware/auth');
const authCreator = require('../middleware/authCreator');
const multer    = require('../middleware/multer-config');

//chemin d'authentification, de gestion de fichiers entrants et de traitement associé
router.get('/:id', auth, profileCtrl.getProfile);
router.put('/:id',auth,authCreator,multer, profileCtrl.modifyProfile);
router.put('/deconnect',auth,profileCtrl.deconnectProfile);
router.delete('/:id',auth,authCreator,profileCtrl.deleteProfile);
module.exports = router;