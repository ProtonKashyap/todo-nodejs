const { addTodo } = require("../controllers/todos");
const router = require("express").Router();

//get requests
router.route("/addTodo").get(function (req, res, next) {
  res.render("addTodo");
});

//post request
router.route("/addTodo").post(addTodo);

module.exports = router;
