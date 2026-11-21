import dns from "node:dns"
import mongoose from "mongoose"
import { env } from "./env.js"

export const connectDB = async () => {

  if (env.dnsServers.length > 0) {
    dns.setServers(env.dnsServers)
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB desconectado")
  })

  await mongoose.connect(env.mongodbUri)
  console.log(`MongoDB conectado: ${mongoose.connection.host}`)
}

export const disconnectDB = () => mongoose.disconnect()
