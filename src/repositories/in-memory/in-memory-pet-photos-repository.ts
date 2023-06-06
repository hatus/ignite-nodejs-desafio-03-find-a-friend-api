import { PetPhoto } from '@prisma/client'
import { PetPhotosRepository } from '../pet-photos-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetPhotosRepository implements PetPhotosRepository {
  public items: PetPhoto[] = []

  async createMany(photos: PetPhoto[], petId: string) {
    photos.forEach((photo) => {
      this.items.push({
        created_at: new Date(),
        id: randomUUID(),
        pet_id: petId,
        url: photo.pet_id,
      })
    })
  }

  async fetchManyByPetId(petId: string) {
    const petPhotos = this.items.filter((photo) => photo.pet_id === petId)

    return petPhotos
  }
}
