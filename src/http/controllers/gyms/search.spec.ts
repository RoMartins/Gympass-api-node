import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/UseCase/utils/test/create-and-authenticate-user'
describe('Search Gym e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Melhores treinos',
        title: 'Academia Js',
        longitude: -49.6401091,
        latitude: -27.2092052,
        phone: '11985549666',
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Melhores treinos',
        title: 'Typescript',
        longitude: -49.6401091,
        latitude: -27.2092052,
        phone: '11985549666',
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Typescript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Typescript',
      }),
    ])
  })
})
