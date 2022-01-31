//importation librairie express dans app pour ajouter les fonctionnalités appropriées
const express     = require('express');
const app         = express();
//HELMET collection de middleware définissant des en-têtes HTTP liés à la sécurité
const helmet      = require('helmet');
//accès au chemin de notre serveur(path)
const path        = require('path');
const userRoutes  = require('./routes/user');
const profileRoutes  = require('./routes/profile');
const forumRoutes  = require('./routes/forum');
const publicationRoutes = require('./routes/publication');
//importation dotenv pour masquer les informations voulues 
const dotenv = require('dotenv');
dotenv.config();

<<<<<<< HEAD

=======
>>>>>>> 8f8818a98ad3f8948b6e05713d72631ac8a37886
app.use(helmet());

//CORS
app.use((req, res, next) => {
  //on autorise ttes les origines*
  res.setHeader('Access-Control-Allow-Origin', '*');
  //autorisation de certains en-têtes
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Boundary, Authorization');
  //envoi de requêtes avec les méthodes mentionnées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //passage au middleware suivant
  next();
});

//méthode pour analyser le corps de la requête en tant qu'objet JSON (POST)
app.use(express.json());
//gestion de la ressource images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));
// //redirection Routes
app.use('/api/auth', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/publication', publicationRoutes);

module.exports = app;
