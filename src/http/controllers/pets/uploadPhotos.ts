import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateManyPetPhotosByPetUseCase } from '@/use-cases/factories/make-create-many-pet-photos-by-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function uploadPhotos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const uploadPhotosParamsSchema = z.object({
      petId: z.string().uuid(),
    })
    const { petId } = uploadPhotosParamsSchema.parse(request.params)
    const photos = request.files.map(({ filename }) => ({ url: filename }))
    const createManyPetPhotosByPetUseCase =
      makeCreateManyPetPhotosByPetUseCase()

    await createManyPetPhotosByPetUseCase.execute({ petId, photos })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
