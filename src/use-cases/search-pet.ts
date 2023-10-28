import {
  Age,
  Environment,
  Independency,
  Pet,
  Size,
  Stamina,
} from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetUseCaseRequest {
  age?: Age
  environment?: Environment
  independency?: Independency
  size?: Size
  stamina?: Stamina
}

interface SearchPetUseCaseResponse {
  pets: Pet[]
}

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    environment,
    independency,
    size,
    stamina,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const pets = await this.petsRepository.fetchManyByCharacteristics({
      age,
      environment,
      independency,
      size,
      stamina,
    })

    return { pets }
  }
}
