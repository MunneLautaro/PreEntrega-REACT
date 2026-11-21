import app from "./app.js"
import { connectDB, disconnectDB } from "./config/db.js"
import { env } from "./config/env.js"

const start = async () => {
  try {
    await connectDB()
    const server = app.listen(env.port, () => {
      console.log(`Servidor escuchando en http://localhost:${env.port}`)
    })

    const shutdown = async (signal) => {
      console.log(`${signal} recibido, cerrando servidor...`)
      server.close(async () => {
        await disconnectDB()
        process.exit(0)
      })
    }

    process.on("SIGINT", shutdown)
    process.on("SIGTERM", shutdown)
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message)
    process.exit(1)
  }
}

start()
