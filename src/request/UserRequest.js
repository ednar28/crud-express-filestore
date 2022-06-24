export default (req, res, next) => {
  res.status(422).send({
    errors: true,
    message: {
      email: 'Required input field email!'
    }
  })
}