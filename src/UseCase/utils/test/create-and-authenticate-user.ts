import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await request(app.server).post('/users').send({
    email: 'rodrigo@example.com',
    password: '123456',
    name: 'Rodrigo',
  })

  const AuthResponse = await request(app.server).post('/sessions').send({
    email: 'rodrigo@example.com',
    password: '123456',
  })

  const { token } = AuthResponse.body

  return {
    token,
  }
}
