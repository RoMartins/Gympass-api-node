import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { SearchGymUseCase } from '../search-gyms'

let gymsRepository: inMemoryGymsRepository
let searchGymUseCase: SearchGymUseCase

describe('Get User Metrics UseCase', () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository()
    searchGymUseCase = new SearchGymUseCase(gymsRepository)
  })
  test('if its possible get metrics useCase', async () => {
    await gymsRepository.create({
      description: 'Melhores treinos',
      title: 'Academia Js',
      latitude: 0,
      longitude: 0,
      phone: '11985549666',
    })

    const { gyms } = await searchGymUseCase.execute({ page: 1, query: 'Js' })

    expect(gyms).toEqual([expect.objectContaining({ title: 'Academia Js' })])
  })

  test('if its possible get paginated gyms list', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        description: 'Melhores treinos',
        title: `Academia Js ${i}`,
        latitude: 0,
        longitude: 0,
        phone: '11985549666',
      })
    }

    const { gyms } = await searchGymUseCase.execute({
      query: 'Js',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Js 21' }),
      expect.objectContaining({ title: 'Academia Js 22' }),
    ])
  })
})
