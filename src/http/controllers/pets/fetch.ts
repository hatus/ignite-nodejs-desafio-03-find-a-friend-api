import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsByCityQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = fetchPetsByCityQuerySchema.parse(request.query)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  try {
    const { pets } = await fetchPetsByCityUseCase.execute({
      city,
    })

    return reply.status(201).send({ pets })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
