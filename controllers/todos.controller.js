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
      attributes: ["task"],
      include: {
        model: User,
        attributes: ["name"],
      },
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
  const UserId = req.user.id; // ambil dari token
  try {
    const todo = await Todo.create({ task, UserId });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};
