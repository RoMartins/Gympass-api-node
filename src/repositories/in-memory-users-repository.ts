import { Prisma, User } from '@prisma/client'
import { UsersRepository } from './user-repository'

export class inMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
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
