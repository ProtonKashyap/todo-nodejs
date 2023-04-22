const { OK } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Todo = require("../models/Todo");
const { compare } = require("bcryptjs");
async function createTodo(req, res, next) {
  const { title } = req.body;
  if (!title) throw new BadRequestError("Please Provide Title");
  await Todo.create({ title: title, createdBy: req.user._id });
  res.redirect("/dashboard");
}

async function deleteTodo(req, res, next) {
  const userId = req.user._id;
  const { todoId } = req.params;
  const todo = await Todo.findByIdAndRemove({ _id: todoId, createdBy: userId });
  if (!todo) throw new NotFoundError("Todo not found");
  res.redirect("/dashboard");
}

//mark todo as completed
async function updateTodo(req, res, next) {
  const {
    user: { _id: userId },
    params: { todoId },
  } = req;
  const todo=await Todo.findById({_id:todoId})
  if (!todo) throw new NotFoundError("Todo not found");
  await Todo.findByIdAndUpdate({ _id: todoId, createdBy: userId },{completed:!todo.completed});
  res.redirect("/dashboard");
}

module.exports = { createTodo, deleteTodo,updateTodo };
