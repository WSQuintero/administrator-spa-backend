import express, { json } from 'express' // require -> commonJS
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'
import { createDatesRouter } from './routes/dates.js'

// después
export const createApp = ({ DatesModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/dates', createDatesRouter({ DatesModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
