import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a organization', async () => {
    await request(app.server).post('/organizations').send({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'hatusn@gmail.com',
      password: '123123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
