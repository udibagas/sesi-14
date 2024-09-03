const UnauthenticatedError = require("../errors/UnauthenticatedError");
const ValidationError = require("../errors/ValidationError");
const { User } = require("../models");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let message;
    if (!email) {
      message = "Please input email";
    }

    if (!password) {
      message = "Please input password";
    }

    throw new ValidationError(message);
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let message;
    if (!email) {
      message = "Please input email";
    }

    if (!password) {
      message = "Please input password";
    }

    throw new ValidationError(message);
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    if (!user.verify(password)) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const token = user.generateToken();
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
