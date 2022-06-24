import { authenticate } from '../middleware/auth.js'
import RegisterController from '../controller/RegisterController.js'
import usersRouter from './user.js'

export default (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.post('/login', authenticate)
  app.post('/register', RegisterController)

  // register
  app.use('/user', usersRouter)

  // url not found
  app.get('*', (req, res) => {
    res.send('Not Found')
  })
}