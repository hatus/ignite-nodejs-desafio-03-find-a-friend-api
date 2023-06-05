import { it, describe, beforeEach, expect } from 'vitest'

import { GetPetProfileUseCase } from './get-pet-profile'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: PetsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(petsRepository)
  })

  it('should be able to get pet profile', async () => {
    const createdPet = await petsRepository.create({
      about: 'cachorro docil',
      age: 'FILHOTE',
      environment: 'BAIXO',
      independency: 'ALTO',
      name: 'Totó',
      size: 'GRANDE',
      stamina: 'BAIXO',
      organization_id: '123',
    })

    const { pet } = await sut.execute({ id: createdPet.id })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get pet profile with wrong id', async () => {
    await expect(() => sut.execute({ id: 'wrong-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
