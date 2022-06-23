import User from '../models/User.js'

class UserRepository {
    list () {
        return User.get()
    }

    show (id) {
        return User.find(id)
    }

    async create (form) {
        const data = await User.create(form)
        return this.show(data.id)
    }

    async update (id, form) {
        await User.update(id, form)
        return this.show(id)
    }

    destroy (id) {
        return User.delete(id)
    }
}

export default new UserRepository()