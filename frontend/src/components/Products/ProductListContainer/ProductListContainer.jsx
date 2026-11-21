import ProductCardList from "../ProductCardList/ProductCardList"
import CategoryFilter from "../CategoryFilter/CategoryFilter"
import styles from "./ProductListContainer.module.css"
import { useState, useEffect, useMemo } from "react"
import { getProducts } from "../../../services/productService"

const ALL = "Todas"

function ProductListContainer() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(ALL)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setProducts(await getProducts())
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("No pudimos cargar los productos. Probá de nuevo en un rato.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Cantidad de productos por categoría, para armar los botones del filtro
  const categories = useMemo(() => {
    const counts = {}
    for (const product of products) {
      counts[product.category] = (counts[product.category] ?? 0) + 1
    }
    return [
      { name: ALL, count: products.length },
      ...Object.keys(counts)
        .sort((a, b) => a.localeCompare(b))
        .map((name) => ({ name, count: counts[name] })),
    ]
  }, [products])

  const visibleProducts =
    selectedCategory === ALL
      ? products
      : products.filter((product) => product.category === selectedCategory)

  if (isLoading) {
    return <p className={styles.statusMessage}>Cargando productos...</p>
  }

  if (error) {
    return <p className={`${styles.statusMessage} ${styles.error}`}>{error}</p>
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Catálogo</p>
        <h1 className={styles.title}>Nuestros instrumentos</h1>
        <p className={styles.subtitle}>
          {visibleProducts.length}{" "}
          {visibleProducts.length === 1 ? "producto" : "productos"}
          {selectedCategory !== ALL && ` en ${selectedCategory}`}
        </p>
      </header>

      {products.length > 0 && (
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      )}

      {visibleProducts.length > 0 ? (
        <ProductCardList products={visibleProducts} />
      ) : (
        <p className={styles.statusMessage}>No hay productos para mostrar.</p>
      )}
    </section>
  )
}

export default ProductListContainer
