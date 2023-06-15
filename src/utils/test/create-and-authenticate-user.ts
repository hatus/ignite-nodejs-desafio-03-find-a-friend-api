import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/libs/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      email: 'john@example.com',
      password_hash: await hash('123123', 6),
      address: 'rua sem fim',
      cep: '64010-100',
      city: 'teresina',
      sponsor_name: 'hatus',
      whatsapp: '86 999912348',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@example.com',
    password: '123123',
  })

  const { token } = authResponse.body

  return { token }
}
