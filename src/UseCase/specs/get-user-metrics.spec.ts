import { inMemoryCheckInsRepository } from '@/repositories/in-memory-checkins-repository'
import { describe, expect, test } from 'vitest'
import { GetUserMetricsUseCase } from '../get-user-metrics'

describe('Get User Metrics UseCase', () => {
  test('if its possible get metrics useCase', async () => {
    const checkInsRepository = new inMemoryCheckInsRepository()
    const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-1',
    })

    await expect(
      getUserMetricsUseCase.execute({ userId: 'user-1' }),
    ).resolves.toHaveProperty('checkInCount', 1)
  })
})
