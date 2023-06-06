import { it, describe, beforeEach, expect } from 'vitest'

import { PetsRepository } from '../repositories/pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { RequirementsRepository } from '@/repositories/requirements-repository'
import { InMemoryPetPhotosRepository } from '@/repositories/in-memory/in-memory-pet-photos-repository'
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository'
import { PetPhotosRepository } from '@/repositories/pet-photos-repository'

let organizationsRepository: OrganizationsRepository
let petsRepository: PetsRepository
let petPhotosRepositoryRepository: PetPhotosRepository
let requirementsRepository: RequirementsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    petPhotosRepositoryRepository = new InMemoryPetPhotosRepository()
    requirementsRepository = new InMemoryRequirementsRepository()
    sut = new CreatePetUseCase(
      petsRepository,
      petPhotosRepositoryRepository,
      requirementsRepository,
    )
  })

  it('should be able to create a pet', async () => {
    const organization = await organizationsRepository.create({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password_hash: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
    })

    const { pet } = await sut.execute({
      organizationId: organization.id,
      about: 'cachorro docil',
      age: 'FILHOTE',
      environment: 'BAIXO',
      independency: 'ALTO',
      name: 'Totó',
      size: 'GRANDE',
      stamina: 'BAIXO',
      photos: [{ url: 'uploads/foto1.png' }, { url: 'uploads/foto2.png' }],
      requirements: [{ description: 'requer atenção dobrada' }],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
