import { useState, useEffect } from "react"
import styles from "./EmployeeListContainer.module.css"
import EmployeeCardList from "../EmployeeCardList/EmployeeCardList"

function EmployeeCardListContainer() {
  const [employees, setEmployees] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/data/nosotros.json")
        if (!response.ok) {
          throw new Error("Error fetching employees")
        }
        const data = await response.json()
        setEmployees(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  return (
    <section
      className={styles.employeeListContainer}
      aria-labelledby="employee-list-title"
    >
      <h2 id="employee-list-title">Nuestro equipo</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {employees.length > 0 && <EmployeeCardList employees={employees} />}
      {employees.length === 0 && !loading && !error && (
        <p>No employees found.</p>
      )}
    </section>
  )
}

export default EmployeeCardListContainer
