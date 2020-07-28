// Dépendances //
const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const fileupload = require("express-fileupload");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");
const { stripTags } = require("./helpers/hbs");
const methodOverride = require("method-override");

const app = express();
// Method OverRide
app.use(methodOverride("_method"));

// Controller //

// Articles
const articleAddController = require("./controllers/articleAdd");
const homePage = require("./controllers/homePage");
const articleSingleController = require("./controllers/articleSingle");
const articlePostController = require("./controllers/articlePost");
const getArticleEditController = require("./controllers/getArticleEdit");
const putArticleEditController = require("./controllers/putArticleEdit");

// User
const userCreate = require("./controllers/userCreate");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userLoginAuth = require("./controllers/userLoginAuth");
const userLogout = require("./controllers/userLogout");

// MongoDB

const db = require("./config/keys").MongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à MongoDB Cloud");
  })
  .catch((err) => console.log(err));

const mongoStore = MongoStore(expressSession);

app.use(connectFlash());

// Post
const Post = require("./database/models/Article");

app.use(
  expressSession({
    secret: "securite",
    name: "biscuit",
    saveUninitialized: true,
    resave: false,

    store: new mongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileupload());

const auth = require("./middleware/auth");
const redirectAuthSuccess = require("./middleware/redirectAuthSuccess");

// Moment
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Express
app.use(express.static("public"));

// Routes
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      stripTags: stripTags,
    },
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");
app.use("*", (req, res, next) => {
  res.locals.user = req.session.userId;
  console.log(res.locals.user);
  next();
});

// MiddleWare
const articleValidPost = require("./middleware/articleValidPost");
app.use("/articles/post", articleValidPost);
app.use("/articles/add", auth);

app.get("/", homePage);

//Articles

app.get("/articles/add", auth, articleAddController);
app.route("/articles/:id").get(articleSingleController);
app.post("/articles/post", auth, articleValidPost, articlePostController);

// Article édition

app.get("/edition/:id", getArticleEditController);
app.put("/edition/:id", putArticleEditController);

// Limiter l'affichage des articles

// Handlebars.registerHelper("limit", function (context, block) {
//   var ret = "",
//     offset = parseInt(block.hash.offset) || 0,
//     limit = parseInt(block.hash.limit) || 5,
//     i = offset < context.length ? offset : 0,
//     j = limit + offset < context.length ? limit + offset : context.length;

//   for (i, j; i < j; i++) {
//     ret += block(context[i]);
//   }

//   return ret;
// });

// User

app.get("/user/create", redirectAuthSuccess, userCreate);
app.post("/user/register", redirectAuthSuccess, userRegister);
app.get("/user/login", redirectAuthSuccess, userLogin);
app.post("/user/loginAuth", redirectAuthSuccess, userLoginAuth);
app.get("/user/logout", userLogout);

// Contact

app.get("/contact", (req, res) => {
  res.render("contact");
});

// 404

app.use((req, res) => {
  res.render("error404");
});

// Server
app.listen(1987, function () {
  console.log("Le server tourne sur le port 1987");
});
