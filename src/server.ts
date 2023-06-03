import { app } from './app'

const PORT = 3334

app.listen({ host: '0.0.0.0', port: PORT }).then(() => {
	console.log(`Listening on port ${PORT}`)
})
