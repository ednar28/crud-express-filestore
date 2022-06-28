import BaseModel from './BaseModel.js'

class User extends BaseModel {
  constructor () {
    super('users')
  }

  getUserByEmail (email) {
    const user = this.collection.where('email', '==', email).get()
    return user
  }
}

export default new User()