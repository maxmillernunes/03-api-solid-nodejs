export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource does not exists.')
  }
}
