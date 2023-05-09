import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { Gym } from '@prisma/client'

interface getNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface getNearbyGymsResponse {
  gyms: Gym[]
}
export class GetNearbyGyms {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: getNearbyGymsRequest): Promise<getNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findGymsNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
