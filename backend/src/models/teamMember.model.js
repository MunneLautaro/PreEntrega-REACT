import { Schema, model } from "mongoose"
import { toJSONPlugin } from "./plugins/toJSON.js"

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

export const TeamMember = model("TeamMember", teamMemberSchema, "equipo")
