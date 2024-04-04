var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const initMongo = require("./mongo");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const polyclinicRouter = require("./routes/polyclinic");
const visitorRouter = require("./routes/visitor");
const queueRouter = require("./routes/queue");

var app = express();
app.use(cors());
// mongodb setup
initMongo();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const http = require("http");

const hostname = "127.0.0.1";
const port = process.env.PORT || 3001;

// No need for HTTP server creation, Express handles it internally

// Set trust proxy
app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Mount routers at appropriate paths
app.use("/", indexRouter);
app.use("/users", usersRouter); // Corrected path for usersRouter
app.use("/polyclinic", polyclinicRouter); // Corrected path for polyclinicRouter
app.use("/visitor", visitorRouter);
app.use("/queue", queueRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("Request URL:", req.originalUrl);
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

module.exports = app;
