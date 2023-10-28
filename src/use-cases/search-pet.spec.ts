import { it, describe, beforeEach, expect } from 'vitest'

import { PetsRepository } from '../repositories/pets-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { SearchPetUseCase } from './search-pet'

let organizationsRepository: OrganizationsRepository
let petsRepository: PetsRepository
let sut: SearchPetUseCase

describe('Search Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetUseCase(petsRepository)
  })

  it('should be able to search a pet by all characteristics', async () => {
    const organization = await organizationsRepository.create({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password_hash: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
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

    const { pets } = await sut.execute({
      age: 'FILHOTE',
      environment: 'BAIXO',
      independency: 'ALTO',
      size: 'GRANDE',
      stamina: 'BAIXO',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search a pet by none characteristics', async () => {
    const organization = await organizationsRepository.create({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password_hash: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
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

    const { pets } = await sut.execute({
      age: undefined,
      environment: undefined,
      independency: undefined,
      size: undefined,
      stamina: undefined,
    })

    expect(pets).toHaveLength(0)
  })

  it('should be able to search a pet by at least one characteristics', async () => {
    const organization = await organizationsRepository.create({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password_hash: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
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
      age: 'FILHOTE',
      environment: 'BAIXO',
      independency: 'ALTO',
      name: 'Totó',
      size: 'PEQUENO',
      stamina: 'ALTO',
    })

    const { pets } = await sut.execute({
      size: 'GRANDE',
      stamina: 'BAIXO',
    })

    expect(pets).toHaveLength(1)
  })
})
