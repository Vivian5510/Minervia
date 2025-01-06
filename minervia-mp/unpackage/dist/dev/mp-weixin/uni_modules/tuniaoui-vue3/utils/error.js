"use strict";
class TuniaoUIError extends Error {
  constructor(message) {
    super(message);
    this.name = "TuniaoUIError";
  }
}
function throwError(scope, msg) {
  throw new TuniaoUIError(`[${scope}] ${msg}`);
}
exports.throwError = throwError;
