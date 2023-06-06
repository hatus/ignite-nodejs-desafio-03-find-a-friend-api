import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetPhoto, Requirement } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetProfileUseCaseRequest {
  id: string
}

interface GetPetProfileUseCaseResponse {
  pet: Pet & {
    photos: PetPhoto[]
    requirements: Requirement[]
  }
}

export class GetPetProfileUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
