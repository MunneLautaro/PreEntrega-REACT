import { request } from "./api"

export const getCoupons = () => request("/coupons")

export const createCoupon = (coupon) =>
  request("/coupons", { method: "POST", body: coupon })

export const deleteCoupon = (id) =>
  request(`/coupons/${id}`, { method: "DELETE" })
