import { makeGetUserMetricsUseCase } from '@/UseCase/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkInCount,
  })
}
