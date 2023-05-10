import { describe, expect, test } from 'vitest'
import { ValidateCheckIn } from '../validate-check-in'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-checkins-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Validate Check-in', () => {
  test('if it is not possible validate check-in', async () => {
    const checkInRepository = new inMemoryCheckInsRepository()
    const validateCheckinUseCase = new ValidateCheckIn(checkInRepository)

    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
      id: 'check-in-01',
    })

    const { checkIn } = await validateCheckinUseCase.execute({
      checkInId: 'check-in-01',
    })

    console.log(checkIn)
    expect(checkIn).toEqual(expect.objectContaining({ id: 'check-in-01' }))
  })

  test('if i possible validate check-in', async () => {
    const checkInRepository = new inMemoryCheckInsRepository()
    const validateCheckinUseCase = new ValidateCheckIn(checkInRepository)

    await expect(
      validateCheckinUseCase.execute({
        checkInId: 'check-in-inexistent',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
