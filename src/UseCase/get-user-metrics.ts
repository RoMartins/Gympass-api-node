import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'

interface getUserMetricsRequest {
  userId: string
}

interface getUserMetricsResponse {
  checkInCount: number
}
export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
  }: getUserMetricsRequest): Promise<getUserMetricsResponse> {
    const checkInCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInCount }
  }
}
