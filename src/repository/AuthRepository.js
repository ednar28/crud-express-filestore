import User from '../models/User.js'

class AuthRepository {
  async login (email, password) {
    const data = await User.getUserByEmail(email)
    let user = null
    data.forEach(doc => {
      user = { id: doc.id, ...doc.data() }
    })

    if (user && user.password === password) {
      return user
    }

    return null
  }

  async register (form) {
    const data = {
      name: form.name,
      email: form.email,
      email_verified_at: null,
      password: form.password,
      max_team_members: 2, // TODO FROM DATABASE
      current_task: null,
      created_at: Date(),
      updated_at: Date(),
    }

    const user = await User.create(data)
    return await User.find(user.id)
  }

  async getUserById (id) {
    return User.find(id)
  }
}

export default new AuthRepository()