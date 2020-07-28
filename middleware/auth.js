const User = require("../database/models/User");

module.exports = (req, res, next) => {
  // Connecte toi dans la base de donnée

  User.findById(req.session.userId, (err, user) => {
    if (err || !user) {
      return res.redirect("/");
    }
    next();
  });

  // Vérifie le user

  

  // Si il est dans la base de donnée
  // Sinon tu le rediriges
};
