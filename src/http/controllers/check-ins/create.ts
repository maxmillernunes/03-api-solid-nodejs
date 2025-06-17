import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createBodySchema.parse(request.body)
  const { gymId } = createParamsSchema.parse(request.params)
  const { sub } = request.user

  const createGymUseCase = makeCheckInUseCase()

  await createGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: sub,
  })

  return reply.status(201).send()
}
