export const validate = (schema) => async (req, _res, next) => {
  req.body = await schema.validate(req.body ?? {}, {
    abortEarly: false,
    stripUnknown: true,
  })
  next()
}
