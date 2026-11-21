import * as yup from "yup"

export const parsePagination = ({ defaultLimit = 10, maxLimit = 50 } = {}) => {
  const schema = yup.object({
    page: yup
      .number()
      .typeError("El parámetro page debe ser un número")
      .integer("El parámetro page debe ser un número entero")
      .min(1, "El parámetro page debe ser mayor o igual a 1")
      .default(1),
    limit: yup
      .number()
      .typeError("El parámetro limit debe ser un número")
      .integer("El parámetro limit debe ser un número entero")
      .min(1, "El parámetro limit debe ser mayor o igual a 1")
      .max(maxLimit, `El parámetro limit no puede superar ${maxLimit}`)
      .default(defaultLimit),
  })

  return async (req, _res, next) => {
    const { page, limit } = req.query
    if (page === undefined && limit === undefined) return next()

    req.pagination = await schema.validate({ page, limit }, { abortEarly: false })
    next()
  }
}
