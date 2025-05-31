import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Gym Use Case', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const gym = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -6.0511893,
      longitude: -38.4534453,
    })

    expect(gym.gym.id).toEqual(expect.any(String))
  })
})
