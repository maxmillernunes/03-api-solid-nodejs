import type { Gym, Prisma } from '@prisma/client'
import type { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById(gymId: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id: gymId },
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data })

    return gym
  }

  async searchMany(
    query: string,
    page: number,
    pageSize?: number
  ): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: pageSize ?? 20,
      skip: (page - 1) * (pageSize ?? 20),
    })

    return gyms
  }

  async findManyNearby({
    latitude,
    longitude,
    page,
    pageSize,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT
        g.*
      FROM
        gyms AS g
      WHERE (6371 * acos(
          cos(radians(${latitude})) * cos(radians(g.latitude)) *
          cos(radians(g.longitude) - radians(${longitude})) +
          sin(radians(${latitude})) * sin(radians(g.latitude))
        )
      ) <= 10
      LIMIT ${pageSize ?? 20} OFFSET ${(page - 1) * (pageSize ?? 20)}
    `
    // Note: The above query uses raw SQL to calculate the distance using the Haversine formula.
    return gyms
  }
}
