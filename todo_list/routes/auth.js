var express =require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");


 router.get("/", function(req, res){
      res.redirect("todos");
  });

//Authentification Routes
//show sign form
router.get("/register", function(req, res){
    res.render("register");
});

//handling user sign up
router.post("/register", function(req, res){
    // req.body.username //take data from the form
    // req.body.password //take data from the form
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log("====Error Happened=====");
            console.log(err.message);
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You are signed up, " + user.username + "!");
            res.redirect("/todos");
        });
    });
});

//Login Routes
//render login form
router.get("/login", function(req, res){
    res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/todos",
    failureRedirect: "/login",
    badRequestMessage : 'Missing username or password.',
    failureFlash: true
}), function(req, res){
    
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/login");
});


module.exports = router;