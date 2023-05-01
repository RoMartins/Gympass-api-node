import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
    name,
  }: RegisterUserRequest) /* Promise<User> */ {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return { user }
  }
}
