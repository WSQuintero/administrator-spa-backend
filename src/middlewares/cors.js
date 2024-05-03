import cors from "cors"

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:5173",
  "https://dates.com",
  "https://midu.dev",
  "https://administrator-spa-backend.vercel.app",
  "https://administrator-spa-backend-production.up.railway.app",
  "https://spa-proyect-front-rdmj.vercel.app"
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error("Not allowed by CORS"))
    }
  })
