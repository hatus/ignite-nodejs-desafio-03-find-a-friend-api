import { PetPhoto, Prisma } from '@prisma/client'
import { PetPhotosRepository } from '../pet-photos-repository'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemoryPetPhotosRepository implements PetPhotosRepository {
  public items: PetPhoto[] = []

  async createMany(
    photos: Prisma.PetPhotoUncheckedCreateWithoutPetInput[],
    petId: string,
  ) {
    if (!petId) {
      throw new ResourceNotFoundError()
    }

    photos.forEach((photo) => {
      this.items.push({
        created_at: new Date(),
        id: randomUUID(),
        pet_id: petId,
        url: photo.url,
      })
    })
  }

  async fetchManyByPetId(petId: string) {
    const petPhotos = this.items.filter((photo) => photo.pet_id === petId)

    return petPhotos
  }
}
