import { CheckInUseCase } from '../check-in'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { CheckInsRepository } from '@/repositories/prisma/checkIns-repository'

export function makeCheckInUseCase() {
  const gymsRepository = new GymsRepository()
  const checkInsRepository = new CheckInsRepository()
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}
