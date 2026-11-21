import { Router } from "express"
import mongoose from "mongoose"
import couponRoutes from "./coupon.routes.js"
import productRoutes from "./product.routes.js"
import teamMemberRoutes from "./teamMember.routes.js"

const router = Router()

router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  })
})

router.use("/products", productRoutes)
router.use("/team", teamMemberRoutes)
router.use("/coupons", couponRoutes)

export default router
