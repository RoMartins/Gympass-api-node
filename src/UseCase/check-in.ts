import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { getDistanceBetweenCoordinates } from './utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

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
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate =
      await this.checkInRepository.findByUserIdCheckInOnSameDate(
        userId,
        new Date(),
      )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInError()
    }

    const checkin = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkin }
  }
}
