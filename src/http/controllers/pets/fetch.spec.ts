import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('List Pets By City E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
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

    const response = await request(app.server).get(`/pets?city=teresina`)

    const pets = response.body.pets

    expect(response.statusCode).toEqual(201)
    expect(pets).toHaveLength(1)
  })
})
