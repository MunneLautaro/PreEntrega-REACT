import { Product } from "../models/product.model.js"
import { HttpError } from "../utils/HttpError.js"
import { paginate } from "../utils/paginate.js"

const SORT = { createdAt: -1, _id: -1 }
const buildFilter = (category) => (category ? { category } : {})

// Equivalente a getDocs(collection(...)) de Firestore; con `category`
// funciona como un where("category", "==", category).
export const getAll = ({ category } = {}) =>
  Product.find(buildFilter(category)).sort(SORT)

export const getPage = ({ category, page, limit }) =>
  paginate(Product, { filter: buildFilter(category), sort: SORT, page, limit })

export const getCategories = () => Product.distinct("category")

export const getCategoryCounts = async () => {
  const groups = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ])
  return groups.map(({ _id, count }) => ({ name: _id, count }))
}

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
