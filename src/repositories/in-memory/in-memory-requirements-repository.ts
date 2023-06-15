import { Prisma, Requirement } from '@prisma/client'
import { randomUUID } from 'crypto'
import { RequirementsRepository } from '../requirements-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemoryRequirementsRepository implements RequirementsRepository {
  public items: Requirement[] = []

  async createMany(
    requirements: Prisma.RequirementUncheckedCreateWithoutPetInput[],
    petId: string,
  ) {
    if (!petId) {
      throw new ResourceNotFoundError()
    }

    requirements.forEach((requirement) => {
      this.items.push({
        created_at: new Date(),
        id: randomUUID(),
        pet_id: petId,
        description: requirement.description,
      })
    })
  }

  async fetchManyByPetId(petId: string) {
    const requirements = this.items.filter(
      (requirement) => requirement.pet_id === petId,
    )

    return requirements
  }
}
