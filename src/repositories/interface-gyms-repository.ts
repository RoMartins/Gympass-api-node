import { Gym, Prisma } from '@prisma/client'

export interface FindGymsNearbyParams {
  latitude: number
  longitude: number
}

export interface InterfaceGymsRepository {
  findGymsNearby(params: FindGymsNearbyParams): Promise<Gym[]>
  searchManyByQuery(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}
