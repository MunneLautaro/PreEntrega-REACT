// Expone `id` en lugar de `_id` y quita `__v` al serializar a JSON,
// así el frontend puede seguir usando `product.id`.
export const toJSONPlugin = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      delete ret._id
      return ret
    },
  })
}
