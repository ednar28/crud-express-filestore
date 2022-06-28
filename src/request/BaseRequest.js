import Validator from 'validatorjs'
import { unprocessableEntity } from '../Helpers/Errors.js'

class BaseRequest {

  setRules (rules) {
    this.rules = rules
  }

  validated (req, res, next) {
    const data = req.body
    let validation = new Validator(data, this.rules)

    if (validation.fails()) {
      return res.status(422).send(unprocessableEntity(validation.errors.errors))
    }

    next()
  }
}

export default new BaseRequest()