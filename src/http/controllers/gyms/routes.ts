import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { search } from './search'
import { create } from './create'
import { nearby } from './nearby'
import { VerifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', { onRequest: [VerifyUserRole('ADMIN')] }, create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
