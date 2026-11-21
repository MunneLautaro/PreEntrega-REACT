import { HttpError } from "../utils/HttpError.js"

export const notFound = (req, _res, next) => {
  next(new HttpError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`))
}
