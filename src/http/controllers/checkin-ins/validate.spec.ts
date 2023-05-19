import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/UseCase/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'
describe('validate Checkin e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able validate user checkin', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title: 'Academia Js',
        latitude: -23.5145096,
        longitude: -46.5045282,
      },
    })

    let checkIn = await prisma.checkIn.create({
      data: { gym_id: gym.id, user_id: user.id },
    })

    const checkinResponse = await request(app.server)
      .patch(`/check-in/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(checkinResponse.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
