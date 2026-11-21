import { Router } from "express"
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js"
import { validate } from "../middlewares/validate.js"
import { validateObjectId } from "../middlewares/validateObjectId.js"
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js"

const router = Router()

router.get("/", getProducts)
router.post("/", validate(createProductSchema), createProduct)

// Tiene que ir antes de "/:id" para que "categories" no se tome como un id
router.get("/categories", getCategories)

router.get("/:id", validateObjectId(), getProductById)
router.patch("/:id", validateObjectId(), validate(updateProductSchema), updateProduct)
router.put("/:id", validateObjectId(), validate(createProductSchema), updateProduct)
router.delete("/:id", validateObjectId(), deleteProduct)

export default router
