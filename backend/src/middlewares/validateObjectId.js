import { isValidObjectId } from "mongoose"
import { HttpError } from "../utils/HttpError.js"

export const validateObjectId =
  (param = "id") =>
  (req, _res, next) => {
    if (!isValidObjectId(req.params[param])) {
      throw new HttpError(400, `El parámetro "${param}" no es un id válido`)
    }
    next()
  }
