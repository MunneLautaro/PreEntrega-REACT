import styles from "./Footer.module.css"
import EmployeeListContainer from "../Employees/EmployeeListContainer/EmployeeListContainer"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <EmployeeListContainer />
      <p className={styles.copyright}>&copy; 2026 - Mi Aplicación React</p>
    </footer>
  )
}
