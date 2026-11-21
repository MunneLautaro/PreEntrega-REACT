import cors from "cors"
import express from "express"
import morgan from "morgan"
import { corsOptions } from "./config/cors.js"
import { isProduction } from "./config/env.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import { notFound } from "./middlewares/notFound.js"
import routes from "./routes/index.js"

const app = express()

// Necesario si el deploy está detrás de un proxy (Render, Railway, etc.)
app.set("trust proxy", 1)
app.disable("x-powered-by")

// Middlewares globales
app.use(cors(corsOptions))
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(isProduction ? "combined" : "dev"))

// Rutas
app.use("/api", routes)

// 404 y manejo centralizado de errores (siempre al final)
app.use(notFound)
app.use(errorHandler)

export default app
