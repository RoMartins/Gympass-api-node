import { Gym, Prisma } from '@prisma/client'
import {
  FindGymsNearbyParams,
  InterfaceGymsRepository,
} from './interface-gyms-repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/UseCase/utils/get-distance-between-coordinates'

export class inMemoryGymsRepository implements InterfaceGymsRepository {
  public items: Gym[] = []

  async findGymsNearby(params: FindGymsNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async searchManyByQuery(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      phone: data.phone ?? null,
      title: data.title,
      created_at: new Date(),
    }

    this.items.push(gym)
    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }
}
