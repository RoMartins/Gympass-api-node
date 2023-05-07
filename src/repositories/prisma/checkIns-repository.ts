import { Prisma, CheckIn } from '@prisma/client'
import { InterfaceCheckInsReposytory } from '../interface-checkins-reposytory'

export class CheckInsRepository implements InterfaceCheckInsReposytory {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {}

  findByUserIdCheckInOnSameDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {}
}
