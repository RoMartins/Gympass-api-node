import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/UseCase/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'
describe('metrics Checkin e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able get metrics user checkin', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title: 'Academia Js',
        latitude: -23.5145096,
        longitude: -46.5045282,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    })

    const metricsResponse = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user.id,
      })
    console.log(metricsResponse)
    expect(metricsResponse.body.checkInCount).toEqual(2)
  })
})
