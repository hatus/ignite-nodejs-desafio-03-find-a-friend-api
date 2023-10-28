import { Prisma, Pet } from '@prisma/client'
import { CharacteristicsType, PetsRepository } from '../pets-repository'
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

  async fetchManyByCharacteristics({
    age,
    environment,
    independency,
    size,
    stamina,
  }: CharacteristicsType) {
    let filtered: Pet[] = []

    if (age) {
      filtered = [...this.items.filter((item) => item.age === age)]
    }

    if (environment) {
      if (filtered.length > 0) {
        filtered = [
          ...filtered.filter((item) => item.environment === environment),
        ]
      } else {
        filtered = [
          ...this.items.filter((item) => item.environment === environment),
        ]
      }
    }

    if (independency) {
      if (filtered.length > 0) {
        filtered = [
          ...filtered.filter((item) => item.independency === independency),
        ]
      } else {
        filtered = [
          ...this.items.filter((item) => item.independency === independency),
        ]
      }
    }

    if (size) {
      if (filtered.length > 0) {
        filtered = [...filtered.filter((item) => item.size === size)]
      } else {
        filtered = [...this.items.filter((item) => item.size === size)]
      }
    }

    if (stamina) {
      if (filtered.length > 0) {
        filtered = [...filtered.filter((item) => item.stamina === stamina)]
      } else {
        filtered = [...this.items.filter((item) => item.stamina === stamina)]
      }
    }

    return filtered
  }
}
