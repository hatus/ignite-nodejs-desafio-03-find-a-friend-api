import { Prisma, Requirement } from '@prisma/client'

export interface RequirementsRepository {
  createMany(
    requirements: Prisma.RequirementUncheckedCreateWithoutPetInput[],
    petId: string,
  ): Promise<Requirement[]>
  fetchManyByPetId(petId: string): Promise<Requirement[]>
}
