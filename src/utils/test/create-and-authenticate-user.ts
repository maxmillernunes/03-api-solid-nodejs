import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('asdqwe', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@gmail.com',
    password: 'asdqwe',
  })

  const { token } = authResponse.body

  return { token }
}
