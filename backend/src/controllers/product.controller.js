import * as productService from "../services/product.service.js"

export const getProducts = async (req, res) => {
  const { category } = req.query
  const products = await productService.getAll({
    category: typeof category === "string" ? category : undefined,
  })
  res.json({ ok: true, data: products })
}

export const getCategories = async (_req, res) => {
  const categories = await productService.getCategories()
  res.json({ ok: true, data: categories.sort() })
}

export const getProductById = async (req, res) => {
  const product = await productService.getById(req.params.id)
  res.json({ ok: true, data: product })
}

export const createProduct = async (req, res) => {
  const product = await productService.create(req.body)
  res.status(201).json({ ok: true, data: product })
}

export const updateProduct = async (req, res) => {
  const product = await productService.update(req.params.id, req.body)
  res.json({ ok: true, data: product })
}

export const deleteProduct = async (req, res) => {
  await productService.remove(req.params.id)
  res.status(204).end()
}
