// Post
const Post = require("../database/models/Article");

module.exports = (req, res) => {
  Post.findById({ _id: req.params.id }, function (err, article) {
    if (!err) {
      res.render("edition", {
        _id: article.id,
        title: article.title,
        content: article.content,
        author: article.author,
      });
    } else {
      res.send(err);
    }
  });
};
