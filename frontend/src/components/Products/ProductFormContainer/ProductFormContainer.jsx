import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { useConfirm } from "../../../hooks/useConfirm"
import { usePaginatedList } from "../../../hooks/usePaginatedList"
import { getErrorMessage } from "../../../services/api"
import {
  createProduct,
  deleteProduct,
  getProductsPage,
  updateProduct,
} from "../../../services/productService"
import Pagination from "../../Pagination/Pagination"
import Tabs, { TabPanel } from "../../Tabs/Tabs"
import ProductAdminList from "../ProductAdminList/ProductAdminList"
import ProductForm from "../ProductForm/ProductForm"
import styles from "./ProductFormContainer.module.css"

const PAGE_SIZE = 10
const TABS_ID = "gestion-productos"

const estadoInicialForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  description: "",
  image: "",
}

const productoAFormulario = (producto) => ({
  name: producto.name,
  category: producto.category,
  price: String(producto.price),
  stock: String(producto.stock),
  description: producto.description ?? "",
  image: producto.image,
})

const subirImagen = async (file) => {
  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    { method: "POST", body: formData },
  )
  const resultado = await response.json().catch(() => null)

  if (!resultado?.success) {
    throw new Error("No se pudo subir la imagen. Por favor, intentá de nuevo.")
  }
  return resultado.data.url
}

function ProductFormContainer() {
  const { confirm } = useConfirm()
  const tabsRef = useRef(null)
  const [activeTab, setActiveTab] = useState("list")

  const {
    items: products,
    pagination,
    setPage,
    isLoading,
    error,
    reload,
  } = usePaginatedList(getProductsPage, PAGE_SIZE)

  const [productoAEditar, setProductoAEditar] = useState(null)
  const [data, setData] = useState(estadoInicialForm)
  const [imageFile, setImageFile] = useState(null)
  const [imageInputKey, setImageInputKey] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const resetForm = (producto = null) => {
    setData(producto ? productoAFormulario(producto) : estadoInicialForm)
    setImageFile(null)
    setImageInputKey((key) => key + 1)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- el ejercicio pide sincronizar el formulario con un useEffect
    resetForm(productoAEditar)
  }, [productoAEditar])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0] ?? null)
  }

  const scrollToTabs = () => {
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handlePageChange = (page) => {
    setPage(page)
    scrollToTabs()
  }

  const handleEditClick = (producto) => {
    setProductoAEditar(producto)
    setActiveTab("form")
    scrollToTabs()
  }

  const cancelarEdicion = () => {
    setProductoAEditar(null)
    setActiveTab("list")
  }

  const validarFormulario = () => {
    const price = Number(data.price)
    const stock = Number(data.stock)

    if (!data.name.trim()) return "El nombre no puede estar vacío."
    if (!data.category) return "Elegí una categoría para el producto."
    if (data.price === "" || !Number.isFinite(price) || price <= 0) {
      return "El precio debe ser un número mayor que cero."
    }
    if (data.stock === "" || !Number.isInteger(stock) || stock < 0) {
      return "El stock debe ser un número entero mayor o igual a 0."
    }
    if (!productoAEditar && !imageFile) {
      return "Seleccioná una imagen para el producto."
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errorValidacion = validarFormulario()
    if (errorValidacion) {
      toast.warn(errorValidacion)
      return
    }

    const name = data.name.trim()
    const price = Number(data.price)
    const stock = Number(data.stock)

    const confirmacion = await confirm(
      productoAEditar
        ? {
            title: "¿Guardar los cambios?",
            message: (
              <p>
                Se va a actualizar <strong>{productoAEditar.name}</strong> con
                los datos del formulario.
              </p>
            ),
            confirmText: "Actualizar producto",
          }
        : {
            title: "¿Agregar este producto?",
            message: (
              <p>
                Se va a dar de alta <strong>{name}</strong> a $
                {price.toFixed(2)} con {stock}{" "}
                {stock === 1 ? "unidad" : "unidades"} en stock.
              </p>
            ),
            confirmText: "Agregar producto",
          },
    )
    if (!confirmacion) return

    try {
      setIsSubmitting(true)

      const image = imageFile ? await subirImagen(imageFile) : data.image
      const productoFinal = {
        name,
        category: data.category,
        price,
        stock,
        description: data.description.trim(),
        image,
      }

      if (productoAEditar) {
        const actualizado = await updateProduct(productoAEditar.id, productoFinal)
        toast.success(`El producto ${actualizado.name} fue actualizado con éxito.`)
        setProductoAEditar(null)
      } else {
        const nuevo = await createProduct(productoFinal)
        toast.success(`El producto ${nuevo.name} fue agregado con éxito.`)
        resetForm()
        setPage(1)
      }
      reload()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar el producto:", error)
      toast.error(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (producto) => {
    const confirmacion = await confirm({
      title: "¿Eliminar este producto?",
      message: (
        <p>
          <strong>{producto.name}</strong> se va a borrar del catálogo de forma
          permanente.
        </p>
      ),
      confirmText: "Eliminar",
      variant: "danger",
    })
    if (!confirmacion) return

    try {
      setDeletingId(producto.id)
      await deleteProduct(producto.id)
      reload()
      if (productoAEditar?.id === producto.id) setProductoAEditar(null)
      toast.success(`El producto ${producto.name} fue eliminado.`)
    } catch (error) {
      console.error("Error al eliminar el producto:", error)
      toast.error(getErrorMessage(error))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>INVENTARIO</p>
        <h2>Gestión de Productos</h2>
        <p className={styles.description}>
          Agregá, editá y eliminá productos del catálogo.
        </p>
      </div>

      <div ref={tabsRef} className={styles.tabsWrapper}>
        <Tabs
          idPrefix={TABS_ID}
          label="Secciones de gestión de productos"
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: "list", label: "Listado", badge: pagination?.total },
            {
              id: "form",
              label: productoAEditar ? "Editar producto" : "Agregar producto",
            },
          ]}
        />
      </div>

      {activeTab === "list" ? (
        <TabPanel idPrefix={TABS_ID} tabId="list" className={styles.panel}>
          <ProductAdminList
            products={products}
            isLoading={isLoading}
            error={
              error &&
              "No pudimos cargar los productos. Probá de nuevo en un rato."
            }
            editingId={productoAEditar?.id}
            deletingId={deletingId}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            disabled={isLoading}
            itemLabel="productos"
          />
        </TabPanel>
      ) : (
        <TabPanel
          idPrefix={TABS_ID}
          tabId="form"
          className={`${styles.panel} ${styles.formPanel}`}
        >
          <ProductForm
            data={data}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            modoEdicion={!!productoAEditar}
            onCancelEdit={cancelarEdicion}
            isSubmitting={isSubmitting}
            imageInputKey={imageInputKey}
          />
        </TabPanel>
      )}
    </section>
  )
}

export default ProductFormContainer
