// all the middleware goes here
var todo = require("../models/todo.js");

var middlewareObj = {};

middlewareObj.checkTodoOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        todo.findById(req.params.id, function(err, foundTodo){
            if(err){
                //res.redirect("back");
                console.log(err);
            }else{
                // does user own the todo
                if (foundTodo.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Error happened");
                    //res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};



middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
};

module.exports = middlewareObj;