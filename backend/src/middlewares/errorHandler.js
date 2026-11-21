import mongoose from "mongoose"
import { ValidationError as YupValidationError } from "yup"
import { isProduction } from "../config/env.js"

const formatYupErrors = (err) =>
  err.inner.length > 0
    ? err.inner.map((e) => ({ field: e.path || null, message: e.message }))
    : [{ field: err.path, message: err.message }]

const formatMongooseErrors = (err) =>
  Object.values(err.errors).map((e) => ({ field: e.path || null, message: e.message }))

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  let status = err.status || err.statusCode || 500
  let message = err.message || "Error interno del servidor"
  let details = err.details

  if (err instanceof YupValidationError) {
    status = 400
    message = "Datos inválidos"
    details = formatYupErrors(err)
  } else if (err instanceof mongoose.Error.ValidationError) {
    status = 400
    message = "Datos inválidos"
    details = formatMongooseErrors(err)
  } else if (err instanceof mongoose.Error.CastError) {
    status = 400
    message = `Valor inválido para "${err.path}"`
  } else if (err.code === 11000) {
    status = 409
    message = `Ya existe un registro con ese valor: ${JSON.stringify(err.keyValue)}`
  } else if (err.type === "entity.parse.failed") {
    status = 400
    message = "El body no es un JSON válido"
  }

  if (status >= 500) {
    console.error(err)
    if (isProduction) message = "Error interno del servidor"
  }

  res.status(status).json({
    ok: false,
    message,
    ...(details && { details }),
    ...(!isProduction && status >= 500 && { stack: err.stack }),
  })
}
