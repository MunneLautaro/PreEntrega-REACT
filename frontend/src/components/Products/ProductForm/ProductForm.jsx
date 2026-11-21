import { PRODUCT_CATEGORIES } from "../../../constants/categories"
import styles from "./ProductForm.module.css"

function ProductForm({
  data,
  handleChange,
  handleImageChange,
  handleSubmit,
  modoEdicion,
  onCancelEdit,
  isSubmitting,
  imageInputKey,
}) {
  const submitText = modoEdicion ? "Actualizar producto" : "Agregar producto"

  return (
    <form
      className={`${styles.productForm} ${modoEdicion ? styles.editing : ""}`}
      onSubmit={handleSubmit}
    >
      <h3 className={styles.formTitle}>
        {modoEdicion ? "Editar producto" : "Agregar nuevo producto"}
      </h3>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Nombre:
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          type="text"
          placeholder="Nombre del producto"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="category">
          Categoría:
        </label>
        <select
          className={styles.input}
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Elegí una categoría
          </option>
          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="price">
          Precio:
        </label>
        <input
          className={styles.input}
          id="price"
          name="price"
          type="number"
          placeholder="Precio del producto"
          min="0.01"
          step="0.01"
          value={data.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="stock">
          Stock:
        </label>
        <input
          className={styles.input}
          id="stock"
          name="stock"
          type="number"
          placeholder="Unidades disponibles"
          min="0"
          step="1"
          value={data.stock}
          onChange={handleChange}
          required
        />
      </div>

      <div className={`${styles.field} ${styles.fullWidth}`}>
        <label className={styles.label} htmlFor="description">
          Descripción (opcional):
        </label>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          id="description"
          name="description"
          placeholder="Breve descripción del producto"
          maxLength={500}
          rows={3}
          value={data.description}
          onChange={handleChange}
        />
      </div>

      <div className={`${styles.field} ${styles.fullWidth}`}>
        <label className={styles.label} htmlFor="image">
          {modoEdicion ? "Nueva imagen (opcional):" : "Imagen:"}
        </label>
        <input
          key={imageInputKey}
          className={styles.input}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!modoEdicion}
        />
        {modoEdicion && data.image && (
          <div className={styles.currentImage}>
            <img src={data.image} alt={`Imagen actual de ${data.name}`} />
            <p>Imagen actual. Si no elegís otra, se mantiene esta.</p>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {modoEdicion && (
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onCancelEdit}
            disabled={isSubmitting}
          >
            Cancelar edición
          </button>
        )}
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : submitText}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
