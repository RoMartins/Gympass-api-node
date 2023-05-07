import { Gym } from '@prisma/client'
import { InterfaceGymsRepository } from '../interface-gyms-repository'

export class GymsRepository implements InterfaceGymsRepository {
  findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }
}
