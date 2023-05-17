import { makeGetUserCheckInHistoryUseCase } from '@/UseCase/factories/make-get-user-check-in-history'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyUserCheckInQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyUserCheckInQuerySchema.parse(request.params)

  const getUserCheckInHistoryUseCase = makeGetUserCheckInHistoryUseCase()

  const { checkIns } = await getUserCheckInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send({
    checkIns,
  })
}
