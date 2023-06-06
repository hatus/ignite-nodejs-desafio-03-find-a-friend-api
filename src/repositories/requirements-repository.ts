import { Prisma, Requirement } from '@prisma/client'

export interface RequirementsRepository {
  createMany(
    requirements: Prisma.RequirementUncheckedCreateWithoutPetInput[],
    petId: string,
  ): Promise<void>
  fetchManyByPetId(petId: string): Promise<Requirement[]>
}
