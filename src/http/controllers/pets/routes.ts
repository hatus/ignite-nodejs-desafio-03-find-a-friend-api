import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { fetch } from './fetch'
import { search } from './search'
import { uploadPhotos } from './uploadPhotos'
import { upload } from '@/libs/upload'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, create)
  app.get('/city', fetch)
  app.get('/', search)
  app.post(
    '/photos/upload/:petId',
    { preHandler: upload.array('photos', 5) },
    uploadPhotos,
  )
}
