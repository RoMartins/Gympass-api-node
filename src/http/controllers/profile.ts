import { makeGetUserProfileUseCase } from '@/UseCase/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function Profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  reply.status(201).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
