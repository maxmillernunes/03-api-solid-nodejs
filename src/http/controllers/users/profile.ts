import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  try {
    const profileUseCase = makeGetUserProfileUseCase()

    const { user } = await profileUseCase.execute({ userId })

    return reply
      .status(200)
      .send({ user: { ...user, password_hash: undefined } })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      })
    }
  }

  return reply.status(200).send()
}
