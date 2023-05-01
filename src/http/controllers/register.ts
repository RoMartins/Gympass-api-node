import { UserAlreadyExistsError } from '@/UseCase/errors/user-already-exists-error'
import { RegisterUseCase } from '@/UseCase/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password, name } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const user = await registerUseCase.execute({
      email,
      name,
      password,
    })

    reply.status(201).send(user)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
