import { Router } from "express"
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
} from "../controllers/coupon.controller.js"
import { validate } from "../middlewares/validate.js"
import { parsePagination } from "../middlewares/parsePagination.js"
import { validateObjectId } from "../middlewares/validateObjectId.js"
import { createCouponSchema } from "../validations/coupon.validation.js"

const router = Router()

router.get("/", parsePagination(), getCoupons)
router.post("/", validate(createCouponSchema), createCoupon)
router.delete("/:id", validateObjectId(), deleteCoupon)

export default router
