import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../../hooks/useCart"
import styles from "./ProductDetail.module.css"

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/data/products.json`)
        const data = await response.json()
        const foundProduct = data.find((p) => p.id === parseInt(id))
        setProduct(foundProduct)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((currentQuantity) => currentQuantity + 1)
    }
  }

  const decrementQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))
  }

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity)
    }
  }

  if (isLoading) {
    return <p className={styles.statusMessage}>Cargando producto...</p>
  }

  if (!product) {
    return (
      <section className={styles.statusMessage}>
        <h1>Producto no encontrado</h1>
        <Link className={styles.backLink} to="/">
          Volver al catálogo
        </Link>
      </section>
    )
  }

  const isOutOfStock = product.stock === 0

  return (
    <section className={styles.detailSection}>
      <Link className={styles.backLink} to="/">
        ← Volver al catálogo
      </Link>

      <article className={styles.detailCard}>
        <div className={styles.imagePanel}>
          <span className={styles.productTag}>Producto destacado</span>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
        </div>

        <div className={styles.productInfo}>
          <p className={styles.eyebrow}>Detalle del producto</p>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>
            {product.description ||
              "Una elección especial para disfrutar todos los días."}
          </p>

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span
              className={`${styles.stock} ${isOutOfStock ? styles.stockEmpty : ""}`}
            >
              {isOutOfStock ? "Sin stock" : `${product.stock} disponibles`}
            </span>
          </div>

          <div className={styles.purchaseArea}>
            <div className={styles.quantityControl}>
              <button
                type="button"
                onClick={decrementQuantity}
                disabled={isOutOfStock || quantity === 1}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={incrementQuantity}
                disabled={isOutOfStock || quantity === product.stock}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "Producto agotado" : "Agregar al carrito"}
            </button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default ProductDetail
