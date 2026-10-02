import ProductCardList from "../ProductCardList/ProductCardList"
import styles from "./ProductListContainer.module.css"
import { useState, useEffect } from "react"

function ProductListContainer({ message }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/data/products.json`)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [])

  if (isLoading) {
    return <p className={styles.loadingMessage}>Cargando productos...</p>
  }

  return (
    <section className={styles.section}>
      <h2>{message}</h2>
      {products.length > 0 && <ProductCardList products={products} />}
    </section>
  )
}

export default ProductListContainer
