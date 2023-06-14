import { it, describe, beforeEach, expect } from 'vitest'

import { PetsRepository } from '../repositories/pets-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { CreateManyPetPhotosByPetUseCase } from './create-many-pet-photos-by-pet'
import { PetPhotosRepository } from '@/repositories/pet-photos-repository'
import { InMemoryPetPhotosRepository } from '@/repositories/in-memory/in-memory-pet-photos-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let organizationsRepository: OrganizationsRepository
let petsRepository: PetsRepository
let petPhotosRepository: PetPhotosRepository
let sut: CreateManyPetPhotosByPetUseCase

describe('Create Many Pet Photos by Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    petPhotosRepository = new InMemoryPetPhotosRepository()
    sut = new CreateManyPetPhotosByPetUseCase(
      petPhotosRepository,
      petsRepository,
    )
  })

  it('should be able to create many pet photos by pet', async () => {
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
        photos: [{ url: 'uploads/foto1.png' }, { url: 'uploads/foto2.png' }],
      }),
    ).resolves.not.toThrowError()
  })

  it('should not be able to create pet photos from inexistent pet', async () => {
    await expect(
      sut.execute({
        petId: 'wrong-pet-id',
        photos: [{ url: 'uploads/foto1.png' }, { url: 'uploads/foto2.png' }],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
