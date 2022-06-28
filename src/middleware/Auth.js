import jwt from 'jsonwebtoken'
import AuthRepository from '../repository/AuthRepository.js'
import { setupEnvironment } from '../config/environment.js'
import { unprocessableEntity } from '../helpers/Errors.js'

setupEnvironment(process.env.NODE_ENV)

const authenticate = async (req, res) => {
  const user = await AuthRepository.login(req.body.email, req.body.password)
  if (user === null) {
    return res.status(422).send(unprocessableEntity({ email: ['Email or Password is wrong!'] }))
  }

  // set current user
  res.send({
    ...user,
    access_token: generateAccessToken(user),
    refresh_token: generateRefreshToken(user),
  })
}

const refreshToken = (req, res) => {
  res.send({
    ...req.user,
    access_token: generateAccessToken(req.user),
    refresh_token: generateRefreshToken(req.user),
  })
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401)

    req.user = user

    next()
  })
}

const authenticateRefreshToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(401)

    req.user = await AuthRepository.getUserById(user.id)

    next()
  })
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

export {
  authenticate,
  refreshToken,
  authenticateToken,
  authenticateRefreshToken,
  generateAccessToken,
  generateRefreshToken,
}