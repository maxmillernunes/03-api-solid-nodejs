import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'john doe',
    email: 'johndoe@gmail.com',
    password: 'asdqwe',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@gmail.com',
    password: 'asdqwe',
  })

  const { token } = authResponse.body

  return { token }
}
