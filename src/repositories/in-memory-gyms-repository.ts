import { Gym } from '@prisma/client'
import { InterfaceGymsRepository } from './interface-gyms-repository'

export class inMemoryGymsRepository implements InterfaceGymsRepository {
  public items: Gym[] = []
  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }
}
