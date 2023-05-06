import { Prisma, User } from '@prisma/client'
import { UsersRepository } from './user-repository'

export class inMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      created_at: new Date(),
      email: data.email,
      password_hash: data.password_hash,
      name: data.name,
    }

    this.items.push(user)
    return user
  }

  async findByEmail(email: string) {
    const userWithSmeEmail = this.items.find((item) => item.email === email)
    if (!userWithSmeEmail) {
      return null
    }

    return userWithSmeEmail
  }
}
