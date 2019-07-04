// TODO: share code between backend and frontend somehow? (this is duplicated on the frontend)
class AuthError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }
}

module.exports = { AuthError };