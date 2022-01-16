// const Publication = require('../models/Publication');

module.exports = (req, res, next) => {
   // on cherche la sauce pour récupérer l id du créateur
   Publication.findOne({ _id: req.params.id})
    .then(publication => { 
    //comparaison id du créateur avec celui extrait du token
    if (publication.userId !== req.token.userId) {
        throw 'Utilisateur non valide';
      } else { next();}})
    .catch(e => res.status(403).json({message: e}))
}