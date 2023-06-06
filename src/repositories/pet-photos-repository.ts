import { PetPhoto, Prisma } from '@prisma/client'

export interface PetPhotosRepository {
  createMany(photos: Prisma.PetPhotoCreateManyInput[]): Promise<void>
  fetchManyByPetId(petId: string): Promise<PetPhoto[]>
}
