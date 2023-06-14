import {
  Age,
  Environment,
  Independency,
  Pet,
  Size,
  Stamina,
} from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  organizationId: string
  about: string
  age: Age
  environment: Environment
  independency: Independency
  name: string
  size: Size
  stamina: Stamina
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organizationId,
    about,
    age,
    environment,
    independency,
    name,
    size,
    stamina,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      organization_id: organizationId,
      about,
      age,
      environment,
      independency,
      name,
      size,
      stamina,
    })

    return { pet }
  }
}
