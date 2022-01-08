// const Publication = require('../models/Publication');

module.exports = (req, res, next) => {
  
    //comparaison id du créateur avec celui extrait du token
    if (publication.userId !== req.token.userId) {
        throw 'Utilisateur non valide';
      } else { next();}
    
}