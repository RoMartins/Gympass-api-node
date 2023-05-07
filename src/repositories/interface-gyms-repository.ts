import { Gym } from '@prisma/client'

export interface InterfaceGymsRepository {
  findById(id: string): Promise<Gym | null>
}
