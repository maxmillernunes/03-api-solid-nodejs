export class MaxNumberOfCheckInError extends Error {
  constructor() {
    super('Max distance reached for check-in')
  }
}
