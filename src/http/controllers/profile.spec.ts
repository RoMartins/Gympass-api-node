import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
describe('Profile e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able get user profile', async () => {
    await request(app.server).post('/users').send({
      email: 'rodrigo@example.com',
      name: 'Rodrigo',
      password: '123456',
    })

    const AuthResponse = await request(app.server).post('/sessions').send({
      email: 'rodrigo@example.com',
      password: '123456',
    })

    const { token } = AuthResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(201)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'rodrigo@example.com',
      }),
    )
  })
})
