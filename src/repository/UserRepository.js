import User from '../model/User.js'

class UserRepository {
  list () {
    return User.get()
  }

  show (id) {
    return User.find(id)
  }

  async create (form) {
    const data = await User.create(form)
    return User.find(data.id)
  }

  async createMany (form) {
    const data = await User.createMany(form.users)
    return User.finds(data)
  }

  async update (id, form) {
    await User.update(id, form)
    return User.show(id)
  }

  destroy (id) {
    return User.delete(id)
  }
}

export default new UserRepository()