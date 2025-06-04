import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import type { Prisma, CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data,
    })

    return checkIn
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('day')
    const endOfDay = dayjs(date).endOf('day')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number, pageSize?: number) {
    const checkIn = await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * (pageSize ?? 20),
    })

    return checkIn
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: { user_id: userId },
    })

    return count
  }
}
