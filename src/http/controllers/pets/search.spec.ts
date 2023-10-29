import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('List Pets By Characteristics E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by Characteristics', async () => {
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

    await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        about: 'cachorro bravo',
        age: 'FILHOTE',
        environment: 'BAIXO',
        independency: 'MEDIO',
        name: 'totó',
        size: 'GRANDE',
        stamina: 'BAIXO',
      })

    const response = await request(app.server).get(
      `/pets?size=GRANDE&stamina=BAIXO&independency=MEDIO`,
    )
    const pets = response.body.pets

    expect(response.statusCode).toEqual(201)
    expect(pets).toHaveLength(1)
  })
})
