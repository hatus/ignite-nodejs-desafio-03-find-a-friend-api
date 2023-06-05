import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { makeAuthUseCase } from '@/use-cases/factories/make-auth-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authBodySchema.parse(request.body)

  try {
    const authenticationUseCase = makeAuthUseCase()
    const { organization } = await authenticationUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
