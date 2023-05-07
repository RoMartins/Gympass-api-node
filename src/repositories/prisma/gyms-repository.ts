import { Gym, Prisma } from '@prisma/client'
import { InterfaceGymsRepository } from '../interface-gyms-repository'

export class GymsRepository implements InterfaceGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }
}
