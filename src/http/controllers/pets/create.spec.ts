import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        about: 'cachorro docil',
        age: 'FILHOTE',
        environment: 'BAIXO',
        independency: 'MEDIO',
        name: 'totó',
        size: 'PEQUENO',
        stamina: 'ALTO',
      })

    expect(response.statusCode).toEqual(201)
  })
})
