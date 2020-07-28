// Post
const Post = require("../database/models/Article");

module.exports = (req, res) => {
  Post.update(
    //condition
    { _id: req.params.id },
    //update
    {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    },
    //option
    { multi: true },
    //exec
    function (err) {
      if (!err) {
        res.redirect("/");
      } else {
        res.send(err);
      }
    }
  );
};
