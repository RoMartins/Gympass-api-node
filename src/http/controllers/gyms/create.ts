import { makeCreateGymUseCase } from '@/UseCase/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
  })

  const { description, latitude, longitude, phone, title } =
    createBodySchema.parse(request.body)

  const CreateGymUseCase = makeCreateGymUseCase()

  await CreateGymUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  })

  reply.status(201).send()
}
