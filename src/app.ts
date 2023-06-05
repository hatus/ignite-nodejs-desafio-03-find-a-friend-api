import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { organizationsRoutes } from './http/controllers/routes'

const app = fastify()

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
