import * as couponService from "../services/coupon.service.js"

export const getCoupons = async (req, res) => {
  if (req.pagination) {
    const { items, pagination } = await couponService.getPage(req.pagination)
    return res.json({ ok: true, data: items, pagination })
  }

  const coupons = await couponService.getAll()
  res.json({ ok: true, data: coupons })
}

export const createCoupon = async (req, res) => {
  const coupon = await couponService.create(req.body)
  res.status(201).json({ ok: true, data: coupon })
}

export const deleteCoupon = async (req, res) => {
  await couponService.remove(req.params.id)
  res.status(204).end()
}
