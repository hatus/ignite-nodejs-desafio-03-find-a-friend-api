import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authentication } from './authentication'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authentication)
}
