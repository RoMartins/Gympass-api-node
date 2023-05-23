import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { nearby } from './nearby'
import { search } from './search'
import { create } from './create'
import { verifyUserRole } from '@/middlewares/verify-credentials'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/nearby', nearby)
  app.get('/gyms/search', search)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
