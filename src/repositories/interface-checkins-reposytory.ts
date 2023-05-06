import { CheckIn, Prisma } from '@prisma/client'

export interface InterfaceCheckInsReposytory {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
