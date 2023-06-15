import { Prisma } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { RequirementsRepository } from '@/repositories/requirements-repository'

interface CreateManyRequirementsByPetUseCaseRequest {
  petId: string
  requirements: Prisma.RequirementUncheckedCreateWithoutPetInput[]
}

export class CreateManyRequirementsByPetUseCase {
  constructor(
    private requirementsRepository: RequirementsRepository,
    private petRepository: PetsRepository,
  ) {}

  async execute({
    requirements,
    petId,
  }: CreateManyRequirementsByPetUseCaseRequest): Promise<void> {
    const petExists = await this.petRepository.findById(petId)

    if (!petExists) {
      throw new ResourceNotFoundError()
    }

    await this.requirementsRepository.createMany(requirements, petId)
  }
}
