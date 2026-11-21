import { Schema, model } from "mongoose"
import { toJSONPlugin } from "./plugins/toJSON.js"

// Integrante del equipo que se muestra en el footer.
// Los campos van en español porque así lo define el ejercicio.
const teamMemberSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    rol: { type: String, required: true, trim: true },
    linkedinURL: { type: String, required: true, trim: true },
    fotoURL: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

teamMemberSchema.plugin(toJSONPlugin)

// El tercer parámetro fija el nombre de la colección en MongoDB: "equipo"
// (si no, Mongoose la llamaría "teammembers").
export const TeamMember = model("TeamMember", teamMemberSchema, "equipo")
