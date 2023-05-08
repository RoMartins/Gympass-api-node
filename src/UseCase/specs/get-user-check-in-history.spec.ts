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

    const { checkIns } = await getUserCheckInHistoryUseCase.execute({
      userId: 'user-1',
      page: 1,
    })

    console.log(checkIns)
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-1' }),
      expect.objectContaining({ gym_id: 'gym-2' }),
    ])
  })

  test('if its possible get paginated check-in history', async () => {
    const checkInsRepository = new inMemoryCheckInsRepository()
    const getUserCheckInHistoryUseCase = new GetUserCheckInHistoryUseCase(
      checkInsRepository,
    )

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-1',
      })
    }

    const { checkIns } = await getUserCheckInHistoryUseCase.execute({
      userId: 'user-1',
      page: 2,
    })

    console.log('*', checkIns)
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
