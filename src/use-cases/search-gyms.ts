import type { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
  pageSize?: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    page,
    query,
    pageSize,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page, pageSize)

    return {
      gyms,
    }
  }
}
