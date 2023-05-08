import { Gym, Prisma } from '@prisma/client'
import { InterfaceGymsRepository } from '../interface-gyms-repository'

export class GymsRepository implements InterfaceGymsRepository {
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
