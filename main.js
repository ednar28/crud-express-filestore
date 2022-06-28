import express from 'express'
import bodyParser from 'body-parser'

// register routes
import router from './src/routes/Index.js'

const app = express()
const port = 3000

// for parsing form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

router(app)

app.listen(port, 'express-app.test', () => {
  console.log(`Example app listening on port ${port}`)
})
