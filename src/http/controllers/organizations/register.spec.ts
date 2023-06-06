import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register Organization E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
    })

    expect(response.statusCode).toEqual(201)
  })
})
