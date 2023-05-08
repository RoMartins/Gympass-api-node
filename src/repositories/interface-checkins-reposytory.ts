import { CheckIn, Prisma } from '@prisma/client'

export interface InterfaceCheckInsReposytory {
  findCheckInHistoryByUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdCheckInOnSameDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null>
}
