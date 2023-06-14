import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'
import { PetPhotosRepository } from '../pet-photos-repository'

export class PrismaPetPhotosRepository implements PetPhotosRepository {
  async createMany(
    photos: Prisma.PetPhotoUncheckedCreateWithoutPetInput[],
    petId: string,
  ) {
    const newPhotos = photos.map((photo) => ({
      url: photo.url,
      pet_id: petId,
    }))

    await prisma.petPhoto.createMany({ data: newPhotos })
  }

  async fetchManyByPetId(petId: string) {
    const petPhotos = await prisma.petPhoto.findMany({
      where: { pet_id: petId },
    })

    return petPhotos
  }
}
