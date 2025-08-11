import request from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('Should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: 'asdqwe',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: 'asdqwe',
    })

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
