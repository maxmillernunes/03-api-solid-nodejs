import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInsHistory } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const createQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(20),
  })

  const { page, pageSize } = createQuerySchema.parse(request.query)
  const { sub } = request.user

  const fetchUserCheckInsHistory = makeFetchUserCheckInsHistory()

  const { checkIns } = await fetchUserCheckInsHistory.execute({
    page,
    pageSize,
    userId: sub,
  })

  return reply.status(200).send({ checkIns })
}
