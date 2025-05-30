import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: '01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 3, 1, 8, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: '01',
    })

    await expect(() =>
      sut.execute({
        gymId: '01',
        userId: '01',
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 3, 1, 8, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: '01',
    })

    vi.setSystemTime(new Date(2025, 3, 2, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: '01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
