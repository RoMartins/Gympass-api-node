import { describe, expect, test } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  test('if the password is being encrypted', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      email: 'johndue@example.com',
      name: 'jhon due',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('if not able to register with same email twice', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndue2@example.com'

    await registerUseCase.execute({
      email,
      name: 'jhon due',
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        email,
        name: 'jhon due',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
