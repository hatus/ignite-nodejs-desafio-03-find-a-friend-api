import { it, describe, beforeEach, expect } from 'vitest'

import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: PetsRepository
let organizationsRepository: OrganizationsRepository
let sut: FetchPetsByCityUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to get pets by city', async () => {
    const organization = await organizationsRepository.create({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password_hash: await hash('123123', 6),
      sponsor_name: 'hatus niwman',
      city: 'teresina',
      whatsapp: '(86) 9999-2348',
    })

    await petsRepository.create({
      organization_id: organization.id,
      about: 'cachorro docil',
      age: 'FILHOTE',
      environment: 'BAIXO',
      independency: 'ALTO',
      name: 'Totó',
      size: 'GRANDE',
      stamina: 'BAIXO',
    })

    await petsRepository.create({
      organization_id: organization.id,
      about: 'cachorro brabo',
      age: 'ADULTO',
      environment: 'ALTO',
      independency: 'ALTO',
      name: 'Brutos',
      size: 'GRANDE',
      stamina: 'MEDIO',
    })

    const { pets } = await sut.execute({ city: 'teresina' })

    expect(pets).toHaveLength(2)

    expect(pets).toEqual([
      expect.objectContaining({ name: 'Totó' }),
      expect.objectContaining({ name: 'Brutos' }),
    ])
  })

  it('should not be able to get pets from inexistent city', async () => {
    await expect(() => sut.execute({ city: 'Codó' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
