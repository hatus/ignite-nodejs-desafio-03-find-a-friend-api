import {
  Age,
  Environment,
  Independency,
  Pet,
  PetPhoto,
  Prisma,
  Requirement,
  Size,
  Stamina,
} from '@prisma/client'

export type CharacteristicsType = {
  age?: Age
  environment?: Environment
  independency?: Independency
  size?: Size
  stamina?: Stamina
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<
    | (Pet & {
        photos: PetPhoto[]
        requirements: Requirement[]
      })
    | null
  >
  fetchManyByOrganizationIds(organizationIds: string[]): Promise<Pet[]>
  fetchManyByCharacteristics(data: CharacteristicsType): Promise<Pet[]>
}
