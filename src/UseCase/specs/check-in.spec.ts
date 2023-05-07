import { describe, expect, test, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-checkins-repository'
import { CheckInUseCase } from '../check-in'
import { Decimal } from '@prisma/client/runtime/library'
import { inMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInError } from '../errors/max-number-of-check-ins-error'

let checkInsRepository: inMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository()
    gymsRepository = new inMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia Js',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('if its possible create a checkin', async () => {
    const { checkin } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })
    expect(checkin.id).toEqual(expect.any(String))
  })

  test('if its not possible create twice checkin on same day', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 12, 15, 0))
    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(
      checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
  })

  test('if its possible create twice checkin on different days', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 12, 15, 0))
    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2023, 1, 5, 15, 15, 0))

    await expect(
      checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).resolves.toBeTruthy()
  })

  test('if its not possible checkin on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Academia Js',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5357518),
      longitude: new Decimal(-46.5086222),
    })

    await expect(
      checkInUseCase.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5339129,
        userLongitude: -46.4958971,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
