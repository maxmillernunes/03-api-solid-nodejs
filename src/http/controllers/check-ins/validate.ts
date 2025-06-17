import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  const { checkIn } = await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(201).send({ checkIn })
}
