import BaseModel from './BaseModel.js'

class User extends BaseModel {
  constructor () {
    super('users')
  }

  getUserByEmail (email) {
    const user = this.collection.where('name', '==', email).get()
    return user
  }
}

export default new User()