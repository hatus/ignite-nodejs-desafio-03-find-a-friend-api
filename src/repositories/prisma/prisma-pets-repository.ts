import {
  Age,
  Environment,
  Independency,
  Pet,
  Prisma,
  Size,
  Stamina,
} from '@prisma/client'

import { CharacteristicsType, PetsRepository } from '../pets-repository'
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

  async fetchManyByCharacteristics({
    age,
    environment,
    size,
    stamina,
    independency,
  }: CharacteristicsType): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: age as Age | undefined,
        size: size as Size | undefined,
        stamina: stamina as Stamina | undefined,
        independency: independency as Independency | undefined,
        environment: environment as Environment | undefined,
      },
    })

    return pets
  }
}
