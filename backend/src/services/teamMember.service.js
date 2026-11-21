import { TeamMember } from "../models/teamMember.model.js"
import { HttpError } from "../utils/HttpError.js"

// Orden de carga: el primero que se creó aparece primero en el footer
export const getAll = () => TeamMember.find().sort({ createdAt: 1, _id: 1 })

export const getById = async (id) => {
  const member = await TeamMember.findById(id)
  if (!member) throw new HttpError(404, "Integrante no encontrado")
  return member
}

export const create = (data) => TeamMember.create(data)

export const update = async (id, data) => {
  const member = await TeamMember.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  })
  if (!member) throw new HttpError(404, "Integrante no encontrado")
  return member
}

export const remove = async (id) => {
  const member = await TeamMember.findByIdAndDelete(id)
  if (!member) throw new HttpError(404, "Integrante no encontrado")
  return member
}
