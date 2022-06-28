import { authenticate, authenticateRefreshToken, authenticateToken, refreshToken } from '../middleware/Auth.js'
import RegisterController from '../controller/RegisterController.js'
import usersRouter from './User.js'

export default (app) => {
  app.get('/', (req, res) => {
    res.send('CRUD-Express-Firestore')
  })
  app.post('/login', authenticate)
  app.post('/refresh_token', authenticateRefreshToken, refreshToken)
  app.post('/register', RegisterController)

  // register
  app.use('/user', authenticateToken, usersRouter)

  // url not found
  app.get('*', (req, res) => {
    res.status(404).send('Not Found')
  })
}