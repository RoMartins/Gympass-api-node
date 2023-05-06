import { describe, expect, test } from 'vitest'
import { GetUserProfileUseCase } from '../get-user-profile'
import { inMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Get user profile', () => {
  test('if its possible to get user profile ', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

    const createdUser = await usersRepository.create({
      email: 'johndue@example.com',
      name: 'jhon due',
      password_hash: '123456',
    })

    await expect(
      getUserProfileUseCase.execute({ userId: createdUser.id }),
    ).resolves.toHaveProperty('user.id', 'user-1')
  })

  test('if its NOT possible to get user profile eith worng Id', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

    await expect(
      getUserProfileUseCase.execute({ userId: 'no-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
