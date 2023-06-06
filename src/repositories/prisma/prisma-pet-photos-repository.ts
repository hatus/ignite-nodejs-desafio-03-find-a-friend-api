import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'
import { PetPhotosRepository } from '../pet-photos-repository'

export class PrismaPetPhotosRepository implements PetPhotosRepository {
  async createMany(
    photos: Prisma.PetPhotoUncheckedCreateWithoutPetInput[],
    petId: string,
  ) {
    await prisma.pet.update({
      data: { photos: { createMany: { data: photos } } },
      where: { id: petId },
    })
  }

  async fetchManyByPetId(petId: string) {
    const petPhotos = await prisma.petPhoto.findMany({
      where: { pet_id: petId },
    })

    return petPhotos
  }
}
