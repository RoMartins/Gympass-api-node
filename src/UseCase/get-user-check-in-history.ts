import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'
import { CheckIn } from '@prisma/client'

interface GetUserCheckInHistoryRequest {
  userId: string
}

export class GetUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: GetUserCheckInHistoryRequest): Promise<CheckIn[]> {
    const checkIns = this.checkInsRepository.findCheckInHistoryByUserId(userId)

    return checkIns
  }
}
