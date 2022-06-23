import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

// for parsing form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// register routes
import usersRouter from './routes/user.js'
app.use('/user', usersRouter)

// url not found
app.get('*', (req, res) => {
  res.send('Not Found')
})

app.listen(port, 'express-app.test', () => {
  console.log(`Example app listening on port ${port}`)
})