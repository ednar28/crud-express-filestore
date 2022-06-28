import supertest from 'supertest'
import app from '../../../src/App.js'
import UserFactory from '../../../src/database/factory/UserFactory.js'
import { generateAccessToken } from '../../../src/middleware/Auth.js'
import User from '../../../src/model/User.js'

let currentUser
let accessToken
let req
describe('UserController', () => {
  beforeAll(async () => {
    req = supertest(app)
  })

  afterAll(async () => {
    // CLOSE CONNECTION
  })

  beforeEach(async () => {
    currentUser = await UserFactory.create()
    accessToken = generateAccessToken(currentUser)
  })

  afterEach(async () => {
    await User.deleteAll()
  })

  test('test index attribute', () => {
    expect(true).toBe(true)
  })
})