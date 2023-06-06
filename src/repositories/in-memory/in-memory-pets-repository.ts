import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    const novo = { ...pet, photos: [], requirements: [] }

    return novo
  }

  async fetchManyByOrganizationIds(organizationIds: string[]) {
    const pets = this.items.filter((item) =>
      organizationIds.includes(item.organization_id),
    )

    return pets
  }
}
