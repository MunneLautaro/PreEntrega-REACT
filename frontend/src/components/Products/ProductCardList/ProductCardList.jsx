import ProductCard from "../ProductCard/ProductCard"
import styles from "./ProductCardList.module.css"

function ProductCardList({ products }) {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductCardList
