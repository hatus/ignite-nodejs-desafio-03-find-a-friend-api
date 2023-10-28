import { SearchPetUseCase } from '../search-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetUseCase(petsRepository)
  return useCase
}
