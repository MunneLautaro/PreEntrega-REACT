import { request } from "./api"

// Colección "equipo" de MongoDB, expuesta por el backend en /api/team
export const getTeam = () => request("/team")
