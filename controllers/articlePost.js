const Post = require("../database/models/Article");
const path = require("path");

module.exports = (req, res) => {
  const { image } = req.files;

  const uploadFile = path.resolve(__dirname, "..", "public/articles", image.name);

  image.mv(uploadFile, (err) => {
    Post.create(
      {
        ...req.body,
        image: `/articles/${image.name}`,
      },
      (err, post) => {
        res.redirect("/");
      }
    );
  });
};
