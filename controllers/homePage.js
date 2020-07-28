// Post
const Post = require("../database/models/Article");

module.exports = async (req, res) => {
  const posts = await Post.find({}).limit(4);
  console.log(req.session);
  res.render("index", { posts });
};
