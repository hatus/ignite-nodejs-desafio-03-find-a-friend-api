import { PrismaPetPhotosRepository } from '@/repositories/prisma/prisma-pet-photos-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreateManyPetPhotosByPetUseCase } from '../create-many-pet-photos-by-pet'

export function makeCreateManyPetPhotosByPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petPhotosRepository = new PrismaPetPhotosRepository()
  const useCase = new CreateManyPetPhotosByPetUseCase(
    petPhotosRepository,
    petsRepository,
  )
  return useCase
}
