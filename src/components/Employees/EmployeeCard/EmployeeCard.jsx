import styles from "./EmployeeCard.module.css"

function EmployeeCard({ employee }) {
  return (
    <article className={styles.employeeCard}>
      <img
        src={employee.image}
        alt={employee.nombre}
        className={styles.employeeImage}
      />
      <h2 className={styles.employeeName}>{employee.nombre}</h2>
      <p className={styles.employeePosition}>{employee.puesto}</p>
      <p className={styles.employeeEmail}>{employee.email}</p>
    </article>
  )
}

export default EmployeeCard
