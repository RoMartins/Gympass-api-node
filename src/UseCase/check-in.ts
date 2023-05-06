import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkin: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository)

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkin = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkin }
  }
}
