import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/UseCase/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'
describe('Create Checkin e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able create a checkin', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Academia Js',
        latitude: -23.5145096,
        longitude: -46.5045282,
      },
    })

    const checkInResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.5145096,
        longitude: -46.5045282,
      })

    expect(checkInResponse.statusCode).toEqual(201)
  })

  test('should not be able create a checkin away from the gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Academia Js',
        latitude: -23.5145096,
        longitude: -46.5045282,
      },
    })

    const checkInResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.6548284,
        longitude: -46.5528212,
      })

    expect(checkInResponse.statusCode).toEqual(400)
    expect(checkInResponse.body).toEqual(
      expect.objectContaining({ message: 'MaxDistanceError' }),
    )
  })
})
