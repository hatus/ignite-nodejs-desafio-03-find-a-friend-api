import { hash } from 'bcryptjs'
import { it, describe, beforeEach, expect } from 'vitest'

import { AuthenticationUseCase } from './authentication'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'

let organizationsRepository: OrganizationsRepository
let sut: AuthenticationUseCase

describe('Authentication Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticationUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password_hash: await hash('123123', 6),
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
    })

    const { organization } = await sut.execute({
      email: 'hatusn@gmail.com',
      password: '123123',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      address: 'rua sem fim',
      cep: '64010-100',
      email: 'hatusn@gmail.com',
      password_hash: await hash('123123', 6),
      sponsor_name: 'hatus niwman',
      whatsapp: '(86) 9999-2348',
    })

    await expect(() =>
      sut.execute({
        email: 'hatusn@gmail.com',
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'notexists@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
