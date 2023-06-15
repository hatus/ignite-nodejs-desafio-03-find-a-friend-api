import { it, describe, beforeEach, expect } from 'vitest'

import { PetsRepository } from '../repositories/pets-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { RequirementsRepository } from '@/repositories/requirements-repository'
import { CreateManyRequirementsByPetUseCase } from './create-many-requirements-by-pet'
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository'

let organizationsRepository: OrganizationsRepository
let petsRepository: PetsRepository
let requirementsRepository: RequirementsRepository
let sut: CreateManyRequirementsByPetUseCase

describe('Create Many Requirements by Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    requirementsRepository = new InMemoryRequirementsRepository()
    sut = new CreateManyRequirementsByPetUseCase(
      requirementsRepository,
      petsRepository,
    )
  })

  it('should be able to create many requirements by pet', async () => {
    const organization = await organizationsRepository.create({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password_hash: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
    })

    const pet = await petsRepository.create({
      organization_id: organization.id,
      about: 'cachorro docil',
      age: 'FILHOTE',
      environment: 'BAIXO',
      independency: 'ALTO',
      name: 'Totó',
      size: 'GRANDE',
      stamina: 'BAIXO',
    })

    await expect(
      sut.execute({
        petId: pet.id,
        requirements: [
          { description: 'precisa comer todo dia' },
          { description: 'precisa passear todo dia' },
        ],
      }),
    ).resolves.not.toThrowError()
  })

  it('should not be able to create requirements from inexistent pet', async () => {
    await expect(
      sut.execute({
        petId: 'wrong-pet-id',
        requirements: [
          { description: 'precisa comer todo dia' },
          { description: 'precisa passear todo dia' },
        ],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
