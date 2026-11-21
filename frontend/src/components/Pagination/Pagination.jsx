import styles from "./Pagination.module.css"

const getPageNumbers = (page, totalPages) => {
  const pages = new Set([1, totalPages, page - 1, page, page + 1])
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)

  return sorted.flatMap((p, i) =>
    i > 0 && p - sorted[i - 1] > 1 ? [`gap-${p}`, p] : [p],
  )
}

function Pagination({ pagination, onPageChange, disabled, itemLabel }) {
  if (!pagination || pagination.total === 0) return null

  const { page, limit, total, totalPages } = pagination
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <nav className={styles.pagination} aria-label={`Paginación de ${itemLabel}`}>
      <p className={styles.summary}>
        Mostrando {from}–{to} de {total} {itemLabel}
      </p>

      {totalPages > 1 && (
        <div className={styles.controls}>
          <button
            className={styles.navButton}
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={disabled || page === 1}
            aria-label="Página anterior"
          >
            ‹ Anterior
          </button>

          <ul className={styles.pages}>
            {getPageNumbers(page, totalPages).map((p) =>
              typeof p === "string" ? (
                <li key={p} className={styles.gap} aria-hidden="true">
                  …
                </li>
              ) : (
                <li key={p}>
                  <button
                    className={`${styles.pageButton} ${p === page ? styles.current : ""}`}
                    type="button"
                    onClick={() => onPageChange(p)}
                    disabled={disabled}
                    aria-label={`Página ${p}`}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </button>
                </li>
              ),
            )}
          </ul>

          <button
            className={styles.navButton}
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={disabled || page === totalPages}
            aria-label="Página siguiente"
          >
            Siguiente ›
          </button>
        </div>
      )}
    </nav>
  )
}

export default Pagination
