import { hash } from 'bcryptjs'

import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'
import { OrganizationsRepository } from '../repositories/organizations-repository'

interface RegisterUseCaseRequest {
  sponsor_name: string
  email: string
  cep: string
  address: string
  whatsapp: string
  password: string
  city: string
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    address,
    cep,
    email,
    password,
    sponsor_name,
    whatsapp,
    city,
  }: RegisterUseCaseRequest) {
    const organizationAlreadyExists =
      await this.organizationsRepository.findByEmail(email)

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      address,
      cep,
      email,
      password_hash,
      sponsor_name,
      whatsapp,
      city,
    })

    return { organization }
  }
}
