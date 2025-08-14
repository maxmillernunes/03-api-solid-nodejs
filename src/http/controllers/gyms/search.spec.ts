import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'A gym for JavaScript enthusiasts',
        phone: '1234567890',
        latitude: -6.0511893,
        longitude: -38.4534453,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypesScript Gym',
        description: 'A gym for TypesScript enthusiasts',
        phone: '1234567890',
        latitude: -6.0511893,
        longitude: -38.4534453,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'JavaScript' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ])
  })
})
