import { useEffect, useState } from "react"
import styles from "./Footer.module.css"
import TeamMemberCard from "../TeamMemberCard/TeamMemberCard"
import { getTeam } from "../../services/teamService"

export default function Footer() {
  const [team, setTeam] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pide la colección "equipo" al backend una sola vez, cuando el footer se monta
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setTeam(await getTeam())
      } catch (error) {
        console.error("Error fetching team:", error)
        setError("No pudimos cargar el equipo.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeam()
  }, [])

  return (
    <footer className={styles.footer}>
      <section className={styles.team} aria-labelledby="team-title">
        <p className={styles.eyebrow}>Quiénes somos</p>
        <h2 id="team-title" className={styles.title}>
          Nuestro equipo
        </h2>

        {isLoading && <p className={styles.status}>Cargando equipo...</p>}
        {error && <p className={styles.status}>{error}</p>}
        {!isLoading && !error && team.length === 0 && (
          <p className={styles.status}>Todavía no hay integrantes cargados.</p>
        )}

        {team.length > 0 && (
          <ul className={styles.teamList}>
            {team.map((member) => (
              <li key={member.id}>
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} React&amp;Music · Hecho con React,
        Express y MongoDB
      </p>
    </footer>
  )
}
