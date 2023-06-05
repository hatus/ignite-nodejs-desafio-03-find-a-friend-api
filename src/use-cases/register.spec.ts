import { it, describe, beforeEach, expect } from 'vitest'

import { RegisterUseCase } from './register'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'
import { compare } from 'bcryptjs'

let organizationsRepository: OrganizationsRepository
let sut: RegisterUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should be able to create a organization', async () => {
    const { organization } = await sut.execute({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a organization with same email twice', async () => {
    const email = 'hatusn@gmail.com'

    await sut.execute({
      address: 'rua sem fim',
      cep: '64010-100',
      email,
      password: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
    })

    await expect(() =>
      sut.execute({
        address: 'rua sem fim',
        cep: '64010-100',
        email,
        password: '123123',
        sponsor_name: 'hatus niwman',
        whatsapp: '(86) 9999-2348',
        city: 'teresina',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should hash organization upon registrarion', async () => {
    const { organization } = await sut.execute({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password: '123123',
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
      city: 'teresina',
    })

    const isPasswordHashCorrectlyHashed = await compare(
      '123123',
      organization.password_hash,
    )

    expect(isPasswordHashCorrectlyHashed).toBe(true)
  })
})
