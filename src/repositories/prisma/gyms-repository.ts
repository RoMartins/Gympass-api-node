import { Gym, Prisma } from '@prisma/client'
import {
  FindGymsNearbyParams,
  InterfaceGymsRepository,
} from '../interface-gyms-repository'
import { prisma } from '@/lib/prisma'

export class GymsRepository implements InterfaceGymsRepository {
  async findGymsNearby(params: FindGymsNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `

    return gyms
  }

  searchManyByQuery(query: string, page: number): Promise<Gym[]> {
    const gyms = prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })
    return gym
  }
}
