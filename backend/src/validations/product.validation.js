import * as yup from "yup"
import { PRODUCT_CATEGORIES } from "../constants/categories.js"

const name = yup.string().trim().min(2, "El nombre debe tener al menos 2 caracteres")
const category = yup
  .string()
  .trim()
  .oneOf(PRODUCT_CATEGORIES, `La categoría debe ser una de: ${PRODUCT_CATEGORIES.join(", ")}`)
const price = yup
  .number()
  .typeError("El precio debe ser un número")
  .min(0, "El precio debe ser mayor o igual a 0")
const stock = yup
  .number()
  .typeError("El stock debe ser un número")
  .integer("El stock debe ser un número entero")
  .min(0, "El stock debe ser mayor o igual a 0")
const image = yup.string().trim().url("La imagen debe ser una URL válida")
const description = yup.string().trim().max(500, "La descripción no puede superar 500 caracteres")

export const createProductSchema = yup.object({
  name: name.required("El nombre es obligatorio"),
  category: category.required("La categoría es obligatoria"),
  price: price.required("El precio es obligatorio"),
  stock: stock.required("El stock es obligatorio"),
  image: image.required("La imagen es obligatoria"),
  description: description.default(""),
})

// Para PATCH/PUT: todos los campos son opcionales pero, si vienen, se validan
export const updateProductSchema = yup
  .object({ name, category, price, stock, image, description })
  .test(
    "not-empty",
    "Debés enviar al menos un campo para actualizar",
    (value) => value && Object.values(value).some((v) => v !== undefined),
  )
