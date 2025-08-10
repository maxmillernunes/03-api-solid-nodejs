import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-Ins Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        latitude: -6.0511893,
        longitude: -38.4534453,
        title: 'JavaScript Gym',
        description: 'A gym for JavaScript enthusiasts',
        phone: '1234567890',
      },
    })

    const checkInResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -6.0511893,
        longitude: -38.4534453,
      })

    expect(checkInResponse.statusCode).toEqual(201)
  })
})
