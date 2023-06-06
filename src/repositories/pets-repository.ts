import { Pet, PetPhoto, Prisma, Requirement } from '@prisma/client'

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
}
