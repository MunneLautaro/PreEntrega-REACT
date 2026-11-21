import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { useConfirm } from "../../hooks/useConfirm"
import { usePaginatedList } from "../../hooks/usePaginatedList"
import { getErrorMessage } from "../../services/api"
import {
  createCoupon,
  deleteCoupon,
  getCouponsPage,
} from "../../services/couponService"
import Pagination from "../Pagination/Pagination"
import Tabs, { TabPanel } from "../Tabs/Tabs"
import styles from "./GestionCupones.module.css"

const estadoInicialForm = { codigo: "", porcentaje: "" }
const PAGE_SIZE = 10
const TABS_ID = "gestion-cupones"

function GestionCupones() {
  const tabsRef = useRef(null)
  const [activeTab, setActiveTab] = useState("list")
  const [datosForm, setDatosForm] = useState(estadoInicialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const { confirm } = useConfirm()

  const {
    items: cupones,
    pagination,
    setPage,
    isLoading,
    error,
    reload,
  } = usePaginatedList(getCouponsPage, PAGE_SIZE)

  const handlePageChange = (page) => {
    setPage(page)
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatosForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const codigo = datosForm.codigo.trim().toUpperCase()
    const porcentaje = Number(datosForm.porcentaje)

    if (!codigo) {
      toast.warn("Ingresá un código para el cupón.")
      return
    }

    if (
      datosForm.porcentaje === "" ||
      !Number.isInteger(porcentaje) ||
      porcentaje < 1 ||
      porcentaje > 100
    ) {
      toast.warn("El porcentaje debe ser un número entero entre 1 y 100.")
      return
    }

    const confirmacion = await confirm({
      title: "¿Crear este cupón?",
      message: (
        <p>
          Se va a crear el cupón <strong>{codigo}</strong> con un{" "}
          <strong>{porcentaje}%</strong> de descuento.
        </p>
      ),
      confirmText: "Crear cupón",
    })
    if (!confirmacion) return

    try {
      setIsSubmitting(true)
      const nuevoCupon = await createCoupon({ codigo, porcentaje })
      setDatosForm(estadoInicialForm)
      toast.success(`Cupón ${nuevoCupon.codigo} creado con éxito.`)
      setPage(1)
      reload()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al crear el cupón:", error)
      toast.error(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (cupon) => {
    const confirmacion = await confirm({
      title: "¿Eliminar este cupón?",
      message: (
        <p>
          El cupón <strong>{cupon.codigo}</strong> ({cupon.porcentaje}% OFF) se
          va a borrar de forma permanente.
        </p>
      ),
      confirmText: "Eliminar",
      variant: "danger",
    })
    if (!confirmacion) return

    try {
      setDeletingId(cupon.id)
      await deleteCoupon(cupon.id)
      reload()
      toast.success(`Cupón ${cupon.codigo} eliminado.`)
    } catch (error) {
      console.error("Error al eliminar el cupón:", error)
      toast.error(getErrorMessage(error))
    } finally {
      setDeletingId(null)
    }
  }

  const renderList = () => {
    if (error) {
      return (
        <p className={`${styles.statusMessage} ${styles.error}`}>
          No pudimos cargar los cupones. Probá de nuevo en un rato.
        </p>
      )
    }

    if (cupones.length === 0) {
      return (
        <p className={styles.statusMessage}>
          {isLoading ? "Cargando cupones..." : "Todavía no hay cupones cargados."}
        </p>
      )
    }

    return (
      <ul
        className={`${styles.list} ${isLoading ? styles.loading : ""}`}
        aria-busy={isLoading}
      >
        {cupones.map((cupon) => (
          <li key={cupon.id} className={styles.item}>
            <span className={styles.codigo}>{cupon.codigo}</span>
            <span className={styles.porcentaje}>{cupon.porcentaje}% OFF</span>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={() => handleDelete(cupon)}
              disabled={deletingId === cupon.id}
            >
              {deletingId === cupon.id ? "Eliminando..." : "Eliminar"}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>ADMINISTRACIÓN</p>
        <h2>Gestión de Cupones</h2>
        <p className={styles.description}>
          Creá y eliminá cupones de descuento.
        </p>
      </div>

      <div ref={tabsRef} className={styles.tabsWrapper}>
        <Tabs
          idPrefix={TABS_ID}
          label="Secciones de gestión de cupones"
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: "list", label: "Listado", badge: pagination?.total },
            { id: "form", label: "Crear cupón" },
          ]}
        />
      </div>

      {activeTab === "list" ? (
        <TabPanel idPrefix={TABS_ID} tabId="list" className={styles.panel}>
          {renderList()}
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            disabled={isLoading}
            itemLabel="cupones"
          />
        </TabPanel>
      ) : (
        <TabPanel idPrefix={TABS_ID} tabId="form" className={styles.panel}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="codigo">
                Código:
              </label>
              <input
                className={`${styles.input} ${styles.inputCodigo}`}
                id="codigo"
                name="codigo"
                type="text"
                placeholder="Ej: AMIGOS10"
                maxLength={20}
                value={datosForm.codigo}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="porcentaje">
                Descuento (%):
              </label>
              <input
                className={styles.input}
                id="porcentaje"
                name="porcentaje"
                type="number"
                placeholder="Ej: 10"
                min="1"
                max="100"
                step="1"
                value={datosForm.porcentaje}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear cupón"}
            </button>
          </form>
        </TabPanel>
      )}
    </section>
  )
}

export default GestionCupones
