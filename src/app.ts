import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { appRoutes } from './http/routes'
import { env } from './env'

export const app = fastify()

/** Using the fastifyJWT to work JWT to generate Authenticate from user */
app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log the error to an external tool, like Sentry/Datadog.
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
