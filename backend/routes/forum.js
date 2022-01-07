//création d'un routeur 
const express   = require('express');
const router    = express.Router();

//importation du chemin comprenant la logique de traitement
const forumCtrl = require('../controllers/forum');
const auth      = require('../middleware/auth');
const authCreator = require('../middleware/authCreator');


//chemin d'authentification, de gestion de fichiers entrants et de traitement associé
router.get('/', forumCtrl.getAllForum);
router.get('/new', auth, forumCtrl.getNewForum);
router.post('/', auth, authCreator, forumCtrl.createForum);
router.delete('/del',auth,authCreator,forumCtrl.deleteForum);
module.exports = router;