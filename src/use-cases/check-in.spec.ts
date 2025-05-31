import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: '01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-6.0511893),
      longitude: new Decimal(-38.4534453),
      createdAt: new Date(),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: '01',
      userLatitude: -6.0511893,
      userLongitude: -38.4534453,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 3, 1, 8, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: '01',
      userLatitude: -6.0511893,
      userLongitude: -38.4534453,
    })

    await expect(() =>
      sut.execute({
        gymId: '01',
        userId: '01',
        userLatitude: -6.0511893,
        userLongitude: -38.4534453,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 3, 1, 8, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: '01',
      userLatitude: -6.0511893,
      userLongitude: -38.4534453,
    })

    vi.setSystemTime(new Date(2025, 3, 2, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: '01',
      userLatitude: -6.0511893,
      userLongitude: -38.4534453,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distance gym', async () => {
    gymsRepository.items.push({
      id: '02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-6.0284644),
      longitude: new Decimal(-38.4460605),
      createdAt: new Date(),
    })

    await expect(() =>
      sut.execute({
        gymId: '02',
        userId: '01',
        userLatitude: -6.0511893,
        userLongitude: -38.4534453,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
