import { PetPhoto, Prisma } from '@prisma/client'
import { PetPhotosRepository } from '../pet-photos-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetPhotosRepository implements PetPhotosRepository {
  public items: PetPhoto[] = []

  async createMany(
    photos: Prisma.PetPhotoUncheckedCreateWithoutPetInput[],
    petId: string,
  ) {
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
