const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api"

export const request = async (path, { method = "GET", body } = {}) => {
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

  return data?.data
}
