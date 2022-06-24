import UserRepository from '../repository/AuthRepository.js'

export default async (req, res) => {
  const form = req.body
  const user = await UserRepository.register(form)

  res.send(user)
}