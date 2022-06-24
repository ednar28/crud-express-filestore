import UserRepository from '../repository/UserRepository.js'

// Get list all users
export const index = async (req, res) => {
  var data = await UserRepository.list()
  res.send(data)
}

// Create new a user
export const store = async (req, res) => {
  // TODO USING VALIDATOR.JS
  const form = req.body
  const user = await UserRepository.create(form)
  res.send(user)
}

// store new many users
export const storeMany = async (req, res) => {
  const form = req.body
  const data = await UserRepository.createMany(form)
  res.send(data)
}

// Get detail user
export const show = async (req, res) => {
  const user = await UserRepository.show(req.params.id)
  res.send(user)
}

// Update an user
export const update = async (req, res) => {
  // TODO USING VALIDATOR.JS
  const form = req.body
  const user = await UserRepository.update(req.params.id, form)
  res.send(user)
}

// Delete an user
export const destroy = async (req, res) => {
  const user = await UserRepository.destroy(req.params.id)
  res.send(user)
}