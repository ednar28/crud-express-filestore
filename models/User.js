import BaseModel from './BaseModel.js'

class User extends BaseModel {
  constructor() {
    super('users')
  }
}

export default new User()