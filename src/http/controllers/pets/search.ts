import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-by-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsByCharacteristics = z.object({
    age: z.enum(['FILHOTE', 'ADULTO']).optional(),
    environment: z.enum(['BAIXO', 'MEDIO', 'ALTO']).optional(),
    independency: z.enum(['BAIXO', 'MEDIO', 'ALTO']).optional(),
    size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']).optional(),
    stamina: z.enum(['BAIXO', 'MEDIO', 'ALTO']).optional(),
  })

  try {
    const { age, environment, independency, size, stamina } =
      fetchPetsByCharacteristics.parse(request.query)
    const searchPetUseCase = makeSearchPetUseCase()

    const { pets } = await searchPetUseCase.execute({
      age,
      environment,
      independency,
      size,
      stamina,
    })

    return reply.status(201).send({ pets })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
