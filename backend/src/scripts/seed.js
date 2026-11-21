// Carga los datos iniciales de src/data/ en MongoDB.
// Borra y vuelve a crear cada colección que carga.
//
// Uso:
//   npm run seed              -> todas las colecciones
//   npm run seed -- equipo    -> solo las que nombres (products, equipo)
import { readFile } from "node:fs/promises"
import { connectDB, disconnectDB } from "../config/db.js"
import { Product } from "../models/product.model.js"
import { TeamMember } from "../models/teamMember.model.js"

const seeds = {
  products: { model: Product, file: "products.json" },
  equipo: { model: TeamMember, file: "equipo.json" },
}

const loadJSON = async (file) =>
  JSON.parse(await readFile(new URL(`../data/${file}`, import.meta.url), "utf-8"))

const requested = process.argv.slice(2)
const unknown = requested.filter((name) => !seeds[name])
const selected = requested.length > 0 ? requested : Object.keys(seeds)

if (unknown.length > 0) {
  console.error(`Colecciones desconocidas: ${unknown.join(", ")}. Opciones: ${Object.keys(seeds).join(", ")}`)
  process.exit(1)
}

try {
  await connectDB()

  for (const name of selected) {
    const { model, file } = seeds[name]
    const docs = await loadJSON(file)
    await model.deleteMany()
    await model.insertMany(docs)
    console.log(`Seed OK: ${docs.length} documentos en "${model.collection.collectionName}"`)
  }
} catch (error) {
  console.error("Error en el seed:", error.message)
  process.exitCode = 1
} finally {
  await disconnectDB()
}
