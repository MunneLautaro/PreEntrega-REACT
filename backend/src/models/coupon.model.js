import { Schema, model } from "mongoose"
import { toJSONPlugin } from "./plugins/toJSON.js"

const couponSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    porcentaje: { type: Number, required: true, min: 1, max: 100 },
  },
  { timestamps: true },
)

couponSchema.plugin(toJSONPlugin)

export const Coupon = model("Coupon", couponSchema, "cupones")
