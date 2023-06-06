import { PetPhoto, Prisma } from '@prisma/client'

export interface PetPhotosRepository {
  createMany(
    photos: Prisma.PetPhotoUncheckedCreateWithoutPetInput[],
    petId: string,
  ): Promise<void>
  fetchManyByPetId(petId: string): Promise<PetPhoto[]>
}
