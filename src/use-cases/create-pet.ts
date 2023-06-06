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
import { PetPhotosRepository } from '@/repositories/pet-photos-repository'
import { RequirementsRepository } from '@/repositories/requirements-repository'

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
  constructor(
    private petsRepository: PetsRepository,
    private petPhotosRepository: PetPhotosRepository,
    private requirementsRepository: RequirementsRepository,
  ) {}

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
    })

    await this.petPhotosRepository.createMany(photos, pet.id)
    await this.requirementsRepository.createMany(requirements, pet.id)

    return { pet }
  }
}
