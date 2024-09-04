const { verify } = require("jsonwebtoken");
const { User } = require("../models");
const UnauthenticatedError = require("../errors/UnauthenticatedError");

exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthenticatedError("Token not found");
  }

  const [type, token] = authorization.split(" ");

  if (!token) {
    throw new UnauthenticatedError("Token not found");
  }

  try {
    const { id } = verify(token, process.env.JWT_SECRET); // true / throw
    const user = await User.findByPk(id);

    if (!user) {
      throw new UnauthenticatedError("Invalid user");
    }

    req.user = user;
  } catch (error) {
    throw error;
  }

  next();
};
