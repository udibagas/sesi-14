class UnauthenticatedError extends Error {
  constructor(message = "Unauthenticated") {
    super(message);
    this.statusCode = 201;
    this.name = "UnauthenticatedError";
  }
}

module.exports = UnauthenticatedError;
