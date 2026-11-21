import { request, requestPage } from "./api"

export const getCouponsPage = (page, limit) =>
  requestPage("/coupons", { page, limit })

export const createCoupon = (coupon) =>
  request("/coupons", { method: "POST", body: coupon })

export const deleteCoupon = (id) =>
  request(`/coupons/${id}`, { method: "DELETE" })
