const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api"

const send = async (path, { method = "GET", body } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    ...(body !== undefined && {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  })
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(
      data?.message ?? "Error al comunicarse con el servidor",
    )
    error.status = response.status
    error.details = data?.details
    throw error
  }

  return data
}

export const request = async (path, options) =>
  (await send(path, options))?.data

export const requestPage = async (path, params) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined),
  )
  const body = await send(`${path}?${query}`)
  return { items: body.data, pagination: body.pagination }
}

export const getErrorMessage = (error) =>
  error.details?.[0]?.message ?? error.message
