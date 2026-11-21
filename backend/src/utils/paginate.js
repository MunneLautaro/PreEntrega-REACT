export const paginate = async (Model, { filter = {}, sort, page, limit }) => {
  const [items, total] = await Promise.all([
    Model.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    Model.countDocuments(filter),
  ])

  return {
    items,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
}
