import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { create } from './create'
import { metrics } from './metrics'
import { history } from './history'
import { validate } from './validate'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', create)
  app.get('/check-ins/metrics', metrics)
  app.get('/check-ins/history', history)

  app.patch(
    '/check-in/:checkInId/validate',

    validate,
  )
}
