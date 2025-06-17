import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(20),
  })

  const { page, q, pageSize } = createBodySchema.parse(request.body)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    page,
    query: q,
    pageSize,
  })

  return reply.status(200).send({ gyms })
}
