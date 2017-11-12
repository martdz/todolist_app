var express =require("express");
var router = express.Router();
var Todo = require("../models/todo.js");
var User = require("../models/user");
var middleware = require("../middleware/index.js"); 


router.get("/", function(req, res){
     res.redirect("todos");
 });
 
//Index - show all todos
router.get("/todos", function(req, res){
    // get all todos from db
    
    Todo.find({}, function(err, all_todos){
        if(err){
            console.log(err + " ==========Error=========");
        }else{
            console.log(req.user + " This is req.user!!!!!!!!! ");
            res.render("todos.ejs", {todos: all_todos, currentUser: req.user});
        }
    });
});

//New - show form to create new todo
router.get("/todos/new", middleware.isLoggedIn, function(req, res){
    res.render("todos.ejs");
});

// Create route - add new todo to DB
router.post("/todos", middleware.isLoggedIn, function(req, res){
    var text = req.body.text;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newTodo = {text: text, author: author};
 
    Todo.create(newTodo, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/todos");
        }
    });
});

//Edit todos

router.get("/todos/:id/edit", middleware.checkTodoOwnership, function(req, res){
        Todo.findById(req.params.id, function(err, foundTodo){
                    res.render("todos.ejs", {todo: foundTodo});
        });    
});
//Update Todos
//UPDATE ROUTE
router.put("/todos/:id", middleware.checkTodoOwnership, function(req, res){
    Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, updatedTodo){
        if(err){
            res.redirect("/todos");
        } else {
            res.redirect("/todos");
        }
    });
});



//Delete Todos
//Destroy route
router.delete("/todos/:id", middleware.checkTodoOwnership, function(req, res){
    //destroy blog
    Todo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/todos");
        } else {
            res.redirect("/todos");
        }
    });
});


module.exports = router;