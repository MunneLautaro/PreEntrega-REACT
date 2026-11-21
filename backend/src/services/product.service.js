import { Product } from "../models/product.model.js"
import { HttpError } from "../utils/HttpError.js"

// Equivalente a getDocs(collection(...)) de Firestore; con `category`
// funciona como un where("category", "==", category).
export const getAll = ({ category } = {}) => {
  const filter = category ? { category } : {}
  return Product.find(filter).sort({ createdAt: -1, _id: -1 })
}

export const getCategories = () => Product.distinct("category")

export const getById = async (id) => {
  const product = await Product.findById(id)
  if (!product) throw new HttpError(404, "Producto no encontrado")
  return product
}

export const create = (data) => Product.create(data)

export const update = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  })
  if (!product) throw new HttpError(404, "Producto no encontrado")
  return product
}

export const remove = async (id) => {
  const product = await Product.findByIdAndDelete(id)
  if (!product) throw new HttpError(404, "Producto no encontrado")
  return product
}
