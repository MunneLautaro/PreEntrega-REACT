import { env } from "./env.js"
import { HttpError } from "../utils/HttpError.js"

export const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.corsOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(
      new HttpError(403, `Origen no permitido por CORS: ${origin}`),
    )
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}
