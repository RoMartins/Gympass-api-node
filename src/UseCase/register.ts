import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/user-repository'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password, name }: RegisterUserRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
  }
}
