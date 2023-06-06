import { Requirement } from '@prisma/client'

export interface RequirementsRepository {
  createMany(requirements: Requirement[]): Promise<void>
}
