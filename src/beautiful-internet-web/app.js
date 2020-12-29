const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const User = require("./models/user");
const homeRouter = require("./routes/home");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

// You will need to create the secrets.json file with your secrets in it
const secrets = require("./config/secrets.json");

var app = express();
const store = new MongoDBStore({
  uri: secrets.mongoDb.URI,
  collection: "sessions",
});
const csrfProtection = csrf();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: secrets.sessions.secret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.user !== undefined;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose.connect(secrets.mongoDb.URI).then((result) => {
  User.findOne().then((user) => {
    if (!user) {
      bcrypt.hash("password", 12).then((hashedPassword) => {
        const newUser = new User({
          email: "gpfuchter@test.com",
          name: "Guille",
          password: hashedPassword,
          votes: 0,
        });
        newUser.save();
      });
    }
  });
});

module.exports = app;
