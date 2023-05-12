import { GetUserMetricsUseCase } from '../get-user-metrics'
import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'

export function makeRegisterUseCase() {
  const chekInsRepository = new CheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(chekInsRepository)

  return getUserMetricsUseCase
}
