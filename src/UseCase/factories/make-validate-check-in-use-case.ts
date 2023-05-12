import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'
import { ValidateCheckIn } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new CheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckIn(checkInsRepository)

  return validateCheckInUseCase
}
