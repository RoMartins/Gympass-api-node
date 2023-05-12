import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'
import { GetUserCheckInHistoryUseCase } from '../get-user-check-in-history'

export function makeGetUserCheckInHistoryUseCase() {
  const checkInsRepository = new CheckInsRepository()
  const getUserCheckInHistoryUseCase = new GetUserCheckInHistoryUseCase(
    checkInsRepository,
  )

  return getUserCheckInHistoryUseCase
}
