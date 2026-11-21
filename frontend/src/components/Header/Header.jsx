import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import { useCart } from "../../hooks/useCart"

export default function Header() {
  const { getCartQuantity } = useCart()
  const totalItems = getCartQuantity()

  return (
    <header className={styles.header}>
      <Link className={styles.brand} to="/" aria-label="Volver al inicio">
        <img
          className={styles.brandLogo}
          src="/images/LogoReact.jpg"
          alt="React to Music"
        />
        <span className={styles.brandName}>React&Music</span>
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link className={styles.navLink} to="/">
              Home
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.navLink} to="/addProduct">
              Alta de Productos
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.navLink} to="/admin/cupones">
              Cupones
            </Link>
          </li>
          <li className={styles.cartItem}>
            <Link
              className={styles.cartLink}
              to="/cart"
              aria-label={`Carrito, ${totalItems} productos`}
            >
              <span className={styles.cartIcon}>🛒</span>
              {totalItems > 0 && (
                <span className={styles.cartCount}>{totalItems}</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
