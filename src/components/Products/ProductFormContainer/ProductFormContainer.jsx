import { useState } from "react"
import ProductForm from "../ProductForm/ProductForm"
import styles from "./ProductFormContainer.module.css"
import { toast } from "react-toastify"

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

    const price = Number(data.price)
    const stock = Number(data.stock)

    if (!data.name.trim()) {
      toast.warn("Por favor, ingresa un nombre para el producto.")
      return
    }

    if (data.price === "" || !Number.isFinite(price) || price < 0) {
      toast.warn("El precio debe ser un número mayor o igual a 0.")
      return
    }

    if (data.stock === "" || !Number.isInteger(stock) || stock < 0) {
      toast.warn("El stock debe ser un número entero mayor o igual a 0.")
      return
    }

    if (!image) {
      toast.warn("Por favor, selecciona una imagen para el producto.")
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
        toast.success(
          `El producto ${productoCompleto.name} fue agregado con éxito.`,
        )
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.")
      }
    } catch (error) {
      toast.error(
        "Hubo un error al subir la imagen. Por favor, intentá de nuevo.",
      )
    } finally {
      setData({
        name: "",
        price: "",
        stock: "",
      })
      setImage(null)
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
