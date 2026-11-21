import styles from "./ProductCard.module.css"
import { useState } from "react"
import { useCart } from "../../../hooks/useCart"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [count, setCount] = useState(0)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const incrementCount = () => {
    if (count < product.stock) {
      setCount(count + 1)
    }
  }

  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (count > 0) {
      addToCart(product, count)
      setCount(0)
      toast.success(`Agregaste ${count} ${product.name} a tu carrito.`)
    }
  }

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <article className={styles.productCard}>
      <div className={styles.cardHeader}>
        <Link className={styles.productLink} to={`/product/${product.id}`}>
          Ver detalle
        </Link>
        <button
          type="button"
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ""}`}
          onClick={toggleFavorite}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
          aria-pressed={isFavorite}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
          loading="lazy"
        />
        {product.category && (
          <span className={styles.categoryBadge}>{product.category}</span>
        )}
      </div>
      <h2 className={styles.productName}>{product.name}</h2>
      {product.description && (
        <p className={styles.productDescription}>{product.description}</p>
      )}
      <div className={styles.priceRow}>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <span
          className={`${styles.stock} ${product.stock <= 3 ? styles.stockLow : ""}`}
        >
          {product.stock === 0
            ? "Sin stock"
            : product.stock <= 3
              ? `¡Quedan ${product.stock}!`
              : `${product.stock} en stock`}
        </span>
      </div>
      <div className={styles.productButtons}>
        <div className={styles.quantityControl}>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={decrementCount}
            aria-label="Disminuir cantidad"
            disabled={count === 0}
          >
            -
          </button>
          <span>{count}</span>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={incrementCount}
            aria-label="Aumentar cantidad"
            disabled={count === product.stock}
          >
            +
          </button>
        </div>

        <button
          className={styles.addButton}
          onClick={handleAddToCart}
          disabled={count === 0}
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}
