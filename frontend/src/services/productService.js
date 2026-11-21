import { request } from "./api"

export const getProducts = () => request("/products")

export const getProductById = (id) => request(`/products/${id}`)
