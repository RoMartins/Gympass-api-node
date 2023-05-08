import { Prisma, CheckIn } from '@prisma/client'
import { InterfaceCheckInsReposytory } from '../interface-checkins-reposytory'

export class CheckInsRepository implements InterfaceCheckInsReposytory {
  findCheckInHistoryByUserId(userId: string, page: number): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }

  findByUserIdCheckInOnSameDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }
}
