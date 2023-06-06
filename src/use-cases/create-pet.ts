import {
  Age,
  Environment,
  Independency,
  Pet,
  Prisma,
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
  photos: Prisma.PetPhotoUncheckedCreateWithoutPetInput[]
  requirements: Prisma.RequirementUncheckedCreateWithoutPetInput[]
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
    photos,
    requirements,
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
      photos: { createMany: { data: photos } },
      requirements: { createMany: { data: requirements } },
    })

    return { pet }
  }
}
