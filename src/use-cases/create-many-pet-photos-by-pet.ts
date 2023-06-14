import { Prisma } from '@prisma/client'

import { PetPhotosRepository } from '@/repositories/pet-photos-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateManyPetPhotosByPetUseCaseRequest {
  petId: string
  photos: Prisma.PetPhotoUncheckedCreateWithoutPetInput[]
}

export class CreateManyPetPhotosByPetUseCase {
  constructor(
    private petPhotosRepository: PetPhotosRepository,
    private petRepository: PetsRepository,
  ) {}

  async execute({
    photos,
    petId,
  }: CreateManyPetPhotosByPetUseCaseRequest): Promise<void> {
    const petExists = await this.petRepository.findById(petId)

    if (!petExists) {
      throw new ResourceNotFoundError()
    }

    await this.petPhotosRepository.createMany(photos, petId)
  }
}
