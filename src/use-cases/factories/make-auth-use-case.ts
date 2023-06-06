import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticationUseCase } from '../authentication'

export function makeAuthUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new AuthenticationUseCase(organizationsRepository)
  return useCase
}
