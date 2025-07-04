import type { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
  page: number
  pageSize?: number
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number, pageSize?: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}
