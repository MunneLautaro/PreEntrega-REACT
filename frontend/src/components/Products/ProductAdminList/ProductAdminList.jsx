import styles from "./ProductAdminList.module.css"

function ProductAdminList({
  products,
  isLoading,
  error,
  editingId,
  deletingId,
  onEdit,
  onDelete,
}) {
  if (error) {
    return <p className={`${styles.statusMessage} ${styles.error}`}>{error}</p>
  }

  if (products.length === 0) {
    return (
      <p className={styles.statusMessage}>
        {isLoading ? "Cargando productos..." : "Todavía no hay productos cargados."}
      </p>
    )
  }

  return (
    <ul
      className={`${styles.list} ${isLoading ? styles.loading : ""}`}
      aria-busy={isLoading}
    >
      {products.map((product) => {
        const isEditing = editingId === product.id
        const isDeleting = deletingId === product.id

        return (
          <li
            key={product.id}
            className={`${styles.item} ${isEditing ? styles.itemEditing : ""}`}
          >
            <img
              className={styles.thumb}
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
            <div className={styles.info}>
              <span className={styles.name}>{product.name}</span>
              <span className={styles.meta}>
                {product.category} · ${product.price.toFixed(2)} ·{" "}
                {product.stock} en stock
              </span>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.editButton}
                type="button"
                onClick={() => onEdit(product)}
                disabled={isEditing || isDeleting}
              >
                {isEditing ? "Editando" : "Editar"}
              </button>
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => onDelete(product)}
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ProductAdminList
