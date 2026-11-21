import { request, requestPage } from "./api"

export const getProductsPage = (page, limit, { category } = {}) =>
  requestPage("/products", { page, limit, category })

export const getCategoryCounts = () =>
  request("/products/categories?withCount=true")

export const getProductById = (id) => request(`/products/${id}`)

export const createProduct = (product) =>
  request("/products", { method: "POST", body: product })

export const updateProduct = (id, product) =>
  request(`/products/${id}`, { method: "PUT", body: product })

export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: "DELETE" })
