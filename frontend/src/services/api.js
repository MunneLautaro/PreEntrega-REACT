// Cliente base para hablar con el backend (Express + Mongoose).
// La URL sale de VITE_API_URL (.env); en local cae a http://localhost:3000/api.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api"

export const request = async (path) => {
  const response = await fetch(`${API_URL}${path}`)
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(body?.message ?? "Error al comunicarse con el servidor")
    error.status = response.status
    throw error
  }

  // El backend responde { ok: true, data }
  return body.data
}
