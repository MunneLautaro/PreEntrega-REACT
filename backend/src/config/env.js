import "dotenv/config"

const required = ["MONGODB_URI"]
const missing = required.filter((key) => !process.env[key])

if (missing.length > 0) {
  throw new Error(`Faltan variables de entorno: ${missing.join(", ")}`)
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI,
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  dnsServers: (process.env.DNS_SERVERS || "")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean),
}

export const isProduction = env.nodeEnv === "production"
