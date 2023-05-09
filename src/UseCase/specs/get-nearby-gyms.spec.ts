import { describe, expect, test } from 'vitest'
import { GetNearbyGyms } from '../get-nearby-gyms'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { inMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import exp from 'constants'

describe('Get Nearby Gyms UseCase', () => {
  const gymsRepository = new inMemoryGymsRepository()
  const getNearbyGyms = new GetNearbyGyms(gymsRepository)

  test('if its possible get nearby gyms', async () => {
    await gymsRepository.create({
      description: 'Academia a menos de 10km',
      title: 'Academia Js',
      latitude: -23.5145096,
      longitude: -46.5045282,
      phone: '11985549666',
    })

    await gymsRepository.create({
      description: 'Academia mais longe que 10km',
      title: 'Academia Js',
      latitude: -24.0854938,
      longitude: -46.9901834,
      phone: '11985549666',
    })

    const { gyms } = await getNearbyGyms.execute({
      userLatitude: -23.5217237,
      userLongitude: -46.4948351,
    })

    expect(gyms).toEqual([
      expect.objectContaining({ description: 'Academia a menos de 10km' }),
    ])
    expect(gyms).toHaveLength(1)
  })
})
