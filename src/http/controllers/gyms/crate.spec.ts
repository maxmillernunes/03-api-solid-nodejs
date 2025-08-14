import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'A gym for JavaScript enthusiasts',
        phone: '1234567890',
        latitude: -6.0511893,
        longitude: -38.4534453,
      })

    expect(gymResponse.statusCode).toEqual(201)
  })
})
