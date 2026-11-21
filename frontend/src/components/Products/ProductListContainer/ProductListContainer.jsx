import { useCallback, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { usePaginatedList } from "../../../hooks/usePaginatedList"
import {
  getCategoryCounts,
  getProductsPage,
} from "../../../services/productService"
import Pagination from "../../Pagination/Pagination"
import CategoryFilter from "../CategoryFilter/CategoryFilter"
import ProductCardList from "../ProductCardList/ProductCardList"
import styles from "./ProductListContainer.module.css"

const ALL = "Todas"
const PAGE_SIZE = 12

const parsePage = (value) => {
  const page = Number(value)
  return Number.isInteger(page) && page >= 1 ? page : 1
}

function ProductListContainer() {
  const sectionRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [categoryCounts, setCategoryCounts] = useState([])

  const selectedCategory = searchParams.get("categoria") ?? ALL
  const page = parsePage(searchParams.get("pagina"))
  const category = selectedCategory === ALL ? undefined : selectedCategory

  const updateParams = useCallback(
    (changes) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        for (const [key, value] of Object.entries(changes)) {
          if (value === null) next.delete(key)
          else next.set(key, value)
        }
        return next
      })
    },
    [setSearchParams],
  )

  const setPage = useCallback(
    (newPage) => updateParams({ pagina: newPage > 1 ? newPage : null }),
    [updateParams],
  )

  const fetchPage = useCallback(
    (pageToFetch, limit) => getProductsPage(pageToFetch, limit, { category }),
    [category],
  )

  const {
    items: products,
    pagination,
    isLoading,
    error,
  } = usePaginatedList(fetchPage, PAGE_SIZE, { page, onPageChange: setPage })

  useEffect(() => {
    getCategoryCounts()
      .then(setCategoryCounts)
      .catch((error) => console.error("Error al cargar las categorías:", error))
  }, [])

  const handleCategoryChange = (name) => {
    updateParams({ categoria: name === ALL ? null : name, pagina: null })
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const categories = [
    {
      name: ALL,
      count: categoryCounts.reduce((total, { count }) => total + count, 0),
    },
    ...categoryCounts,
  ]

  if (error) {
    return (
      <p className={`${styles.statusMessage} ${styles.error}`}>
        No pudimos cargar los productos. Probá de nuevo en un rato.
      </p>
    )
  }

  if (isLoading && products.length === 0) {
    return <p className={styles.statusMessage}>Cargando productos...</p>
  }

  const total = pagination?.total ?? 0

  return (
    <section ref={sectionRef} className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Catálogo</p>
        <h1 className={styles.title}>Nuestros instrumentos</h1>
        <p className={styles.subtitle}>
          {total} {total === 1 ? "producto" : "productos"}
          {category && ` en ${category}`}
        </p>
      </header>

      {categoryCounts.length > 0 && (
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
        />
      )}

      {products.length > 0 ? (
        <div
          className={`${styles.results} ${isLoading ? styles.loading : ""}`}
          aria-busy={isLoading}
        >
          <ProductCardList products={products} />
        </div>
      ) : (
        <p className={styles.statusMessage}>No hay productos para mostrar.</p>
      )}

      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
        disabled={isLoading}
        itemLabel="productos"
      />
    </section>
  )
}

export default ProductListContainer
