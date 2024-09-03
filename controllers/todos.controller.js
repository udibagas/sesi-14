const NotfoundError = require("../errors/NotfoundError");
const { Todo } = require("../models");

exports.index = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new NotfoundError();
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};
