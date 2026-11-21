import styles from "./ProductForm.module.css"

function ProductForm({ data, handleChange, handleImageChange, handleSubmit }) {
  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="name">
        Name:
      </label>
      <input
        className={styles.input}
        id="name"
        name="name"
        type="text"
        placeholder="Product Name"
        value={data.name}
        onChange={handleChange}
        required
      />
      <label className={styles.label} htmlFor="price">
        Price:
      </label>
      <input
        className={styles.input}
        id="price"
        name="price"
        type="number"
        placeholder="Product Price"
        min="0"
        step="0.01"
        value={data.price}
        onChange={handleChange}
        required
      />
      <label className={styles.label} htmlFor="stock">
        Stock:
      </label>
      <input
        className={styles.input}
        id="stock"
        name="stock"
        type="number"
        placeholder="Product Stock"
        min="0"
        step="1"
        value={data.stock}
        onChange={handleChange}
        required
      />
      <label className={styles.label} htmlFor="image">
        Image URL:
      </label>
      <input
        className={styles.input}
        id="image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button className={styles.button} type="submit">
        Add Product
      </button>
    </form>
  )
}

export default ProductForm
