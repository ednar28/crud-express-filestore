import { faker } from '@faker-js/faker'
import User from '../../model/User.js'
import Factory from './Factory.js'


class UserFactory extends Factory {
  constructor () {
    super(User)
  }

  definition () {
    return {
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      asana_id: faker.word.adjective(),
      max_team_members: 2,
      current_task: null,
      teams: [],
      created_at: new Date(),
      updated_at: new Date(),
    }
  }
}

export default new UserFactory()