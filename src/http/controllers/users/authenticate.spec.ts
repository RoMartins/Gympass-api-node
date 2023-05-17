import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to register', async () => {
    await request(app.server).post('/users').send({
      email: 'rodrigo@example.com',
      name: 'Rodrigo',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'rodrigo@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
