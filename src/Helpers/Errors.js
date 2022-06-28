export const unprocessableEntity = (err = {}) => {
  return {
    status: 422,
    message: 'Unprocessable Entity',
    errors: err,
  }
}