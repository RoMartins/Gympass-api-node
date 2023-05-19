import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/UseCase/utils/test/create-and-authenticate-user'
describe('nearby Gym e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test.only('should be able list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Academia a menos de 10km',
        title: 'Academia Js',
        latitude: -23.5145096,
        longitude: -46.5045282,
        phone: '11985549666',
      })

    await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Melhores treinos',
        title: 'Typescript',
        latitude: -24.0854938,
        longitude: -46.9901834,
        phone: '11985549666',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.5217237,
        longitude: -46.4948351,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Academia Js',
      }),
    ])
  })
})
