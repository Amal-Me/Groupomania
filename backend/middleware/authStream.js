//middleware d'authentification pour securiser les routes
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    //extraction de l id et du token dans l URL de la requête
    const userId = req.url.split("?Id=")[1].split("&Token=")[0];
    const token = req.url.split("?Id=")[1].split("&Token=")[1];    
    //verification-décodage stocké dans la requête pour réutilisation
    tokId = jwt.verify(token, "Clé_très_sécurisée");      
    //comparaison userId avec celui extrait du token
    if (userId == tokId.userId) {
      next();
    } else {      
      throw "Utilisateur non valide";
    }
  } catch {
    res.status(401).json({
      error: "error" || "Requête non authentifiée",
    });
  }
};
