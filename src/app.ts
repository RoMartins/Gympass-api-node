import fastify from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password, name } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      email,
      password_hash: password,
      name,
    },
  })

  reply.status(201).send()
})
