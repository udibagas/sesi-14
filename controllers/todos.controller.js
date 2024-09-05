const ForbiddenError = require("../errors/ForbiddenError");
const NotfoundError = require("../errors/NotfoundError");
const { Todo, User } = require("../models");

exports.index = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      include: { model: User },
    });

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  const { id } = req.params;

  let condition = {};

  if (req.user.role == "user") {
    condition = { UserId: req.user.id };
  }

  try {
    const todo = await Todo.findByPk(id, {
      where: condition,
    });

    if (!todo) throw new NotfoundError();
    // if (todo.UserId != req.user.id) throw ForbiddenError();
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const { task } = req.body;
  const UserId = req.user.id;
  try {
    const todo = await Todo.create({ task, UserId });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { task } = req.body;
  const UserId = req.user.id;

  try {
    const todo = await Todo.findByPk(id, { where: { UserId } });
    await todo.update({ task });
    if (!todo) throw new NotfoundError();
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  const UserId = req.user.id;

  try {
    const todo = await Todo.findByPk(id, { where: { UserId } });
    await todo.destroy();
    if (!todo) throw new NotfoundError();
    res.status(200).json({ message: "Task has been deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
