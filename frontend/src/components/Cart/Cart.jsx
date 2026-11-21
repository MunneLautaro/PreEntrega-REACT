import { useCart } from "../../hooks/useCart"
import { useConfirm } from "../../hooks/useConfirm"
import styles from "./Cart.module.css"

const Cart = () => {
  const { cart, clearCart, getCartTotal } = useCart()
  const { confirm } = useConfirm()

  const handleClearCart = async () => {
    const confirmacion = await confirm({
      title: "¿Vaciar el carrito?",
      message: "Se van a quitar todos los productos del carrito.",
      confirmText: "Vaciar carrito",
      variant: "danger",
    })
    if (confirmacion) clearCart()
  }

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <h1 className={styles.emptyTitle}>El carrito está vacío</h1>
        <p className={styles.emptyText}>
          Agrega productos para continuar la compra.
        </p>
      </div>
    )
  }
  return (
    <div className={styles.cart}>
      <h1 className={styles.heading}>Carrito de Compras</h1>
      <div className={styles.items}>
        {cart.map((item) => (
          <article key={item.id} className={styles.cartItem}>
            <h4 className={styles.productName}>{item.name}</h4>
            <p className={styles.detail}>Cantidad: {item.quantity}</p>
            <p className={styles.detail}>Precio unitario: ${item.price}</p>
            <p className={styles.subtotal}>
              Subtotal: ${item.price * item.quantity}
            </p>
          </article>
        ))}
      </div>
      <div className={styles.summary}>
        <h3 className={styles.totalLabel}>Total a pagar</h3>
        <p className={styles.total}>${getCartTotal()}</p>
      </div>
      <button className={styles.clearButton} onClick={handleClearCart}>
        Vaciar Carrito
      </button>
    </div>
  )
}
export default Cart
