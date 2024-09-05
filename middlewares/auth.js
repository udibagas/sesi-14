const { verify } = require("jsonwebtoken");
const { User } = require("../models");
const UnauthenticatedError = require("../errors/UnauthenticatedError");

exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw new UnauthenticatedError("Token not found");
    const [type, token] = authorization.split(" ");
    if (!token) throw new UnauthenticatedError("Token not found");
    const { id } = verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) throw new Error("Invalid user");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
