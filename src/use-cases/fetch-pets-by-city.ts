import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '../../../repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

interface FetchPetsByCityUseCaseRequest {
  city: string
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const organizations = await this.organizationsRepository.fetchManyByCity(
      city,
    )

    if (organizations.length === 0) {
      throw new ResourceNotFoundError()
    }

    const organizationIds = organizations.map((organization) => organization.id)

    const pets = await this.petsRepository.fetchManyByOrganizationIds(
      organizationIds,
    )

    return {
      pets,
    }
  }
}
