import request from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: 'asdqwe',
    })

    expect(response.statusCode).toEqual(201)
  })
})
