import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/UseCase/utils/test/create-and-authenticate-user'
describe('Gym e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be ablecreate a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Melhores treinos',
        title: 'Academia Js',
        longitude: -49.6401091,
        latitude: -27.2092052,
        phone: '11985549666',
      })

    expect(gymResponse.statusCode).toEqual(201)
  })
})
