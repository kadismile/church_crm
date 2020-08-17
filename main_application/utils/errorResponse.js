class ErrorResponse extends Error {
  statusCode;type;name;
  constructor(message, statusCode, type, name) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.name = name;
  }
}

module.exports = ErrorResponse;