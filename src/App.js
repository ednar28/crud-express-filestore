import express from 'express'
import bodyParser from 'body-parser'

// register routes
import router from './routes/Index.js'

const app = express()

// for parsing form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

router(app)

export default app
