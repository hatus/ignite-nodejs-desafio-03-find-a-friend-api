import { Prisma } from '@prisma/client'

import { PetsRepository } from '../pets-repository'
import { prisma } from '@/libs/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: { photos: true, requirements: true },
    })

    return pet
  }

  async fetchManyByOrganizationIds(organizationIds: string[]) {
    const pets = await prisma.pet.findMany({
      where: { organization_id: { in: organizationIds } },
    })

    return pets
  }
}
