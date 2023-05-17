import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { SearchGymUseCase } from '../search-gyms'

export function makeSearchGymUseCase() {
  const gymsRepository = new GymsRepository()
  const searchGymUseCase = new SearchGymUseCase(gymsRepository)

  return searchGymUseCase
}
