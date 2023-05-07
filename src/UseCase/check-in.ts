import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkin: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }
    // calculate distance

    const checkInOnSameDate =
      await this.checkInRepository.findByUserIdCheckInOnSameDate(
        userId,
        new Date(),
      )

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkin = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkin }
  }
}
