const { BadRequestError } = require("../errors");
const Todo = require("../models/Todo");
async function addTodo(req, res, next) {
  const { title } = req.body;
  if (!title) throw new BadRequestError("Please Provide Title");
  await Todo.create({ title: title, createdBy: req.user._id });
  res.redirect("/dashboard");
}

module.exports = { addTodo };
