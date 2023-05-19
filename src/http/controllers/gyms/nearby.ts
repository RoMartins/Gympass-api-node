import { makeGetNearbyGymsUseCase } from '@/UseCase/factories/make-get-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQueryParamsSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
  })

  const { latitude, longitude } = nearbyGymsQueryParamsSchema.parse(
    request.query,
  )

  const getNearbyGymsUseCase = makeGetNearbyGymsUseCase()

  const { gyms } = await getNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  reply.status(201).send({
    gyms,
  })
}
