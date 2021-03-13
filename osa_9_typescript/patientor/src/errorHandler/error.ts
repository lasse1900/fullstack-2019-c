/* eslint-disable @typescript-eslint/no-explicit-any */
export class InvalidPatientError extends Error {
  constructor(...params: any) {
    // Pass remaining arguments to parent constructor
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPatientError);
    }
    this.name = "InvalidPatientError";
  }
}
