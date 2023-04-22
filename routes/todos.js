const { createTodo, deleteTodo, updateTodo } = require("../controllers/todos");
const router = require("express").Router();

//get requests
router.route("/addTodo").get(function (req, res, next) {
  res.render("addTodo");
});

//post request
router.route("/addTodo").post(createTodo);

router.route("/deleteTodo/:todoId").get(deleteTodo);

router.route("/updateTodo/:todoId").get(updateTodo);

module.exports = router;
