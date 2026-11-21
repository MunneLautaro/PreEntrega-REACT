import { Schema, model } from "mongoose"
import { PRODUCT_CATEGORIES } from "../constants/categories.js"
import { toJSONPlugin } from "./plugins/toJSON.js"

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: PRODUCT_CATEGORIES,
      index: true,
    },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    image: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
)

productSchema.plugin(toJSONPlugin)

export const Product = model("Product", productSchema)
