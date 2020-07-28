const User = require("../database/models/User");

module.exports = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      const registerError = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );

      req.flash("registerError", registerError);

      req.flash("data", req.body);

      return res.redirect("/user/create");
    }

    res.redirect("/");
  });
};
