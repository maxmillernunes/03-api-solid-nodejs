import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'

import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()

/** Using the fastifyJWT to work JWT to generate Authenticate from user */
app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(usersRoutes)
app.register(gymsRoutes)

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
