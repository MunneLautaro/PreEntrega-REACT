import { useState } from "react"
import ProductForm from "../ProductForm/ProductForm"
import styles from "./ProductFormContainer.module.css"

function ProductFormContainer() {
  const [data, setData] = useState({
    name: "",
    price: "",
    stock: "",
  })
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      alert("Por favor, selecciona una imagen para el producto.")
      return
    }
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY
    const formData = new FormData()
    formData.append("image", image)

    try {
      console.log("Subiendo imagen a Imgbb...")
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      )
      const datosImgbb = await respuestaImgbb.json()
      if (datosImgbb.success) {
        console.log("Imagen subida con éxito. URL:", datosImgbb.data.url)
        const productoCompleto = {
          ...data,
          urlImagen: datosImgbb.data.url,
        }
        console.log(
          "Enviando los siguientes datos COMPLETOS a la API:",
          productoCompleto,
        )
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.")
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error)
      alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.")
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>VINYL INVENTORY</p>
        <h2>Add Product</h2>
        <p className={styles.description}>
          Add a new record to your collection.
        </p>
      </div>
      <ProductForm
        data={data}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
    </section>
  )
}

export default ProductFormContainer
