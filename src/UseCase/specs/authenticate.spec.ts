import { beforeEach, describe, expect, test } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { inMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let usersRepository: inMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Service', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })
  test('if to be able to authenticate ', async () => {
    await usersRepository.create({
      email: 'johndue@example.com',
      name: 'jhon due',
      password_hash: await hash('123456', 6),
    })

    await expect(
      authenticateUseCase.execute({
        email: 'johndue@example.com',
        password: '123456',
      }),
    ).resolves.toHaveProperty('user.name', 'jhon due')
  })

  test('if not able to authenticate with wrong email', () => {
    expect(
      authenticateUseCase.execute({
        email: 'no-existing-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('if not able to authenticate with wrong passaword', async () => {
    await usersRepository.create({
      email: 'johndue@example.com',
      name: 'jhon due',
      password_hash: await hash('123456', 6),
    })

    await expect(
      authenticateUseCase.execute({
        email: 'johndue@example.com',
        password: '55555555',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
