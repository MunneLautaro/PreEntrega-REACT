import { Router } from "express"
import mongoose from "mongoose"
import productRoutes from "./product.routes.js"
import teamMemberRoutes from "./teamMember.routes.js"

const router = Router()

// Útil para el health check del servicio de deploy
router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  })
})

router.use("/products", productRoutes)
router.use("/team", teamMemberRoutes)

export default router
