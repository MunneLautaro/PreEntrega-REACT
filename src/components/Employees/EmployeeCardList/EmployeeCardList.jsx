import styles from "./EmployeeCardList.module.css"
import EmployeeCard from "../EmployeeCard/EmployeeCard"

function EmployeeCardList({ employees }) {
  return (
    <div className={styles.employeeCardList}>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  )
}

export default EmployeeCardList
