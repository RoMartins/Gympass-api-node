import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { GetNearbyGyms } from '../get-nearby-gyms'

export function makeGetNearbyGymsUseCase() {
  const gymsRepository = new GymsRepository()
  const getNearbyGymsUseCase = new GetNearbyGyms(gymsRepository)

  return getNearbyGymsUseCase
}
