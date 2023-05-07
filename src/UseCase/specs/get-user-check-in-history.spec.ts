import { describe, expect, test } from 'vitest'
import { GetUserCheckInHistoryUseCase } from '../get-user-check-in-history'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-checkins-repository'

describe('Get user check-in history useCase', () => {
  test('if its possible get user check-in history', async () => {
    const checkInsRepository = new inMemoryCheckInsRepository()
    const getUserCheckInHistoryUseCase = new GetUserCheckInHistoryUseCase(
      checkInsRepository,
    )
    await checkInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    await checkInsRepository.create({
      gym_id: 'gym-2',
      user_id: 'user-1',
    })

    const checkIn = await getUserCheckInHistoryUseCase.execute({
      userId: 'user-1',
    })

    console.log(checkIn)
    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })
})
