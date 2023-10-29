import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    about: z.string(),
    age: z.enum(['FILHOTE', 'ADULTO']),
    environment: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
    independency: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
    name: z.string(),
    size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
    stamina: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
  })

  const { about, age, environment, independency, name, size, stamina } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  try {
    await createPetUseCase.execute({
      about,
      age,
      environment,
      independency,
      name,
      size,
      stamina,
      organizationId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
