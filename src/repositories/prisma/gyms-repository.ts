import { Gym, Prisma } from '@prisma/client'
import {
  FindGymsNearbyParams,
  InterfaceGymsRepository,
} from '../interface-gyms-repository'

export class GymsRepository implements InterfaceGymsRepository {
  findGymsNearby(params: FindGymsNearbyParams): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  searchManyByQuery(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  create(data: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }
}
