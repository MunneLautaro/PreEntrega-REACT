import * as productService from "../services/product.service.js"

export const getProducts = async (req, res) => {
  const category =
    typeof req.query.category === "string" ? req.query.category : undefined

  if (req.pagination) {
    const { items, pagination } = await productService.getPage({
      category,
      ...req.pagination,
    })
    return res.json({ ok: true, data: items, pagination })
  }

  const products = await productService.getAll({ category })
  res.json({ ok: true, data: products })
}

export const getCategories = async (req, res) => {
  if (req.query.withCount === "true") {
    const categories = await productService.getCategoryCounts()
    categories.sort((a, b) => a.name.localeCompare(b.name))
    return res.json({ ok: true, data: categories })
  }

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
