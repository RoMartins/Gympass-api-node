import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ValidateCheckIn } from '../validate-check-in'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-checkins-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { lateCheckInValidationError } from '../errors/late-check-in-validation-error'

let checkInRepository: inMemoryCheckInsRepository
let validateCheckinUseCase: ValidateCheckIn
describe('Validate Check-in', () => {
  beforeEach(() => {
    checkInRepository = new inMemoryCheckInsRepository()
    validateCheckinUseCase = new ValidateCheckIn(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('if it is not possible validate check-in', async () => {
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
    await expect(
      validateCheckinUseCase.execute({
        checkInId: 'check-in-inexistent',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  test('if it is not possible validate check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
      id: 'check-in-01',
    })

    const twentyOneMinutes = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutes)

    await expect(
      validateCheckinUseCase.execute({
        checkInId: 'check-in-01',
      }),
    ).rejects.toBeInstanceOf(lateCheckInValidationError)
  })
})
