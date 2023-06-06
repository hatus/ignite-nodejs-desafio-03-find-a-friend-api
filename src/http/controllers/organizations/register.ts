import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterUseCase } from '../../use-cases/factories/make-register-use-case'
import { OrganizationAlreadyExistsError } from '../../use-cases/errors/organization-already-exists-error'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    sponsor_name: z.string(),
    email: z.string().email(),
    cep: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
    city: z.string(),
  })

  const { sponsor_name, email, cep, address, whatsapp, password, city } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      address,
      cep,
      password,
      city,
      email,
      sponsor_name,
      whatsapp,
    })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
