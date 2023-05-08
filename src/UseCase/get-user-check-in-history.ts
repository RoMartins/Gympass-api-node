import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'
import { CheckIn } from '@prisma/client'

interface GetUserCheckInHistoryRequest {
  userId: string
  page: number
}

interface GetUserCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class GetUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: GetUserCheckInHistoryRequest): Promise<GetUserCheckInHistoryResponse> {
    const checkIns = await this.checkInsRepository.findCheckInHistoryByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
