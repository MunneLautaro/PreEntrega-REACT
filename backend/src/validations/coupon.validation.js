import * as yup from "yup"

export const createCouponSchema = yup.object({
  codigo: yup
    .string()
    .trim()
    .uppercase()
    .matches(/^[A-Z0-9_-]{3,20}$/, "El código debe tener entre 3 y 20 caracteres (letras, números, - o _)")
    .required("El código es obligatorio"),
  porcentaje: yup
    .number()
    .typeError("El porcentaje debe ser un número")
    .integer("El porcentaje debe ser un número entero")
    .min(1, "El porcentaje debe ser al menos 1")
    .max(100, "El porcentaje no puede superar 100")
    .required("El porcentaje es obligatorio"),
})
