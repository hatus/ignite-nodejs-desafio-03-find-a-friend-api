import fastify, { FastifyReply, FastifyRequest } from 'fastify'

const app = fastify()

app.get('/', (req: FastifyRequest, res: FastifyReply) => {
	return res.status(200).send({ message: 'ola mundo' })
})

export { app }
