const mongoose = require("mongoose");
const Article = require("./database/models/Article");

mongoose.connect("mongodb://localhost:27017/blog-test");

Article.findByIdAndUpdate(
  "5f1803eff1258026a08786e8",
  {
    title: "Spiderman 2",
  },
  (err, post) => {
    console.log(err, post);
  }
);

// Article.findById("5f1803eff1258026a08786e8", (err, articles) => {
//   console.log(err, articles);
// });

// Article.find(
//   {
//     title: "Spiderman",
//   },
//   (err, articles) => {
//     console.log(err, articles);
//   }
// );

// Article.create(
//   {
//     title: "Spiderman",
//     intro: "Test d'introduction",
//     content: "Critiques sur le film Spiderman",
//   },
//   (err, post) => {
//     console.log(err, post);
//   }
// );
