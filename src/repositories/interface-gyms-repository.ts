import { Gym, Prisma } from '@prisma/client'

export interface InterfaceGymsRepository {
  searchManyByQuery(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}
