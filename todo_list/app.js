var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./config/db");
var methodOverride = require("method-override");
var passport = require("passport");
var localStrategy = require("passport-local");
var expressSanitizer = require("express-sanitizer");
var todo = require("./models/todo.js");
var User = require("./models/user.js");
var flash = require("connect-flash");

//requiring routes
var todoRoutes = require("./routes/todo"),
    authRoutes = require("./routes/auth");

//APP CONFIG
//mongoose.connect("mongodb://localhost/todolist_app");
//mongoose.connect("mongodb://<user>:<password>@ds121575.mlab.com:21575/todolist");
//mongoose.connect(process.env.DATABASEURL);
mongoose.connect(db.url);
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "some secret info",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user; 
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


app.use(todoRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
});

