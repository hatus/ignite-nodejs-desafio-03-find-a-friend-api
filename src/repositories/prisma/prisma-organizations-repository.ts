import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'
import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({ data })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    })

    return organization
  }

  async fetchManyByCity(city: string) {
    const organizations = await prisma.organization.findMany({
      where: { city },
      include: {
        pets: {
          include: {
            photos: true,
            requirements: true,
          },
        },
      },
    })

    return organizations
  }
}
