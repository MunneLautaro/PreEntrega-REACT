import { Coupon } from "../models/coupon.model.js"
import { HttpError } from "../utils/HttpError.js"

export const getAll = () => Coupon.find().sort({ createdAt: -1, _id: -1 })

export const create = async (data) => {
  if (await Coupon.exists({ codigo: data.codigo })) {
    throw new HttpError(409, `Ya existe un cupón con el código ${data.codigo}`)
  }
  return Coupon.create(data)
}

export const remove = async (id) => {
  const coupon = await Coupon.findByIdAndDelete(id)
  if (!coupon) throw new HttpError(404, "Cupón no encontrado")
  return coupon
}
