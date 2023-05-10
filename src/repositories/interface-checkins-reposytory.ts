import { CheckIn, Prisma } from '@prisma/client'

export interface InterfaceCheckInsReposytory {
  save(checkIn: CheckIn): Promise<CheckIn>
  findById(checkInId: string): Promise<CheckIn | null>
  countByUserId(userId: String): Promise<number>
  findCheckInHistoryByUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdCheckInOnSameDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null>
}
