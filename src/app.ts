import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'

import { env } from './env'
import { organizationsRoutes } from './http/controllers/routes'
import { multer } from './libs/upload'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(multer.contentParser)
app.register(organizationsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here we should log to an external tool like datadog/sentry/newrelic
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

export { app }
