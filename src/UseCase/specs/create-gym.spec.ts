import { describe, expect, test } from 'vitest'
import { CreateGymUseCase } from '../create-gym'
import { inMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'

describe('Create Gym UseCase', () => {
  test('if its possible create a gym', async () => {
    const gymsRepository = new inMemoryGymsRepository()
    const createGymUseCase = new CreateGymUseCase(gymsRepository)

    const { gym } = await createGymUseCase.execute({
      description: 'Melhores treinos',
      title: 'Academia Js',
      latitude: 0,
      longitude: 0,
      phone: '11985549666',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
