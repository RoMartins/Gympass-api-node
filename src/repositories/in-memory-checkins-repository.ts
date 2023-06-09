import { CheckIn, Prisma } from '@prisma/client'
import { InterfaceCheckInsReposytory } from './interface-checkins-reposytory'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class inMemoryCheckInsRepository implements InterfaceCheckInsReposytory {
  public items: CheckIn[] = []
  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex(
      (checkin) => checkin.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkin = this.items.find((checkIns) => checkIns.id === checkInId)

    if (!checkin) {
      return null
    }

    return checkin
  }

  async countByUserId(userId: String): Promise<number> {
    return this.items.filter((checkin) => checkin.user_id === userId).length
  }

  async findCheckInHistoryByUserId(userId: string, page: number) {
    return this.items
      .filter((checkin) => checkin.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findByUserIdCheckInOnSameDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkin.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkin)
    return checkin
  }
}
