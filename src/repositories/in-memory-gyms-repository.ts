import { Gym, Prisma } from '@prisma/client'
import { InterfaceGymsRepository } from './interface-gyms-repository'
import { randomUUID } from 'crypto'

export class inMemoryGymsRepository implements InterfaceGymsRepository {
  public items: Gym[] = []

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
