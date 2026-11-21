import * as yup from "yup"

const nombre = yup.string().trim().min(2, "El nombre debe tener al menos 2 caracteres")
const rol = yup.string().trim().min(2, "El rol debe tener al menos 2 caracteres")
const linkedinURL = yup
  .string()
  .trim()
  .url("El LinkedIn debe ser una URL válida")
  .matches(/^https:\/\/([a-z]{2,3}\.)?linkedin\.com\//, "El LinkedIn debe ser una URL de linkedin.com")
const fotoURL = yup.string().trim().url("La foto debe ser una URL válida")

export const createTeamMemberSchema = yup.object({
  nombre: nombre.required("El nombre es obligatorio"),
  rol: rol.required("El rol es obligatorio"),
  linkedinURL: linkedinURL.required("El LinkedIn es obligatorio"),
  fotoURL: fotoURL.required("La foto es obligatoria"),
})

export const updateTeamMemberSchema = yup
  .object({ nombre, rol, linkedinURL, fotoURL })
  .test(
    "not-empty",
    "Debés enviar al menos un campo para actualizar",
    (value) => value && Object.values(value).some((v) => v !== undefined),
  )
