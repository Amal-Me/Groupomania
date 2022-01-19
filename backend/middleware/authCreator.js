module.exports = (req, res, next) => {
  try {
    //comparaison id du créateur avec celui extrait du token
    if (req.token.userId === 1) {
      next();
    }
    if (req.body.User_Id !== req.token.userId) {
      throw "Utilisateur non valide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "error" || "Requête non authentifiée",
    });
  }
};
