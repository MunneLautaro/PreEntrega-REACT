import styles from "./CategoryFilter.module.css"

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <nav className={styles.filter} aria-label="Filtrar por categoría">
      {categories.map(({ name, count }) => {
        const isActive = name === selected
        return (
          <button
            key={name}
            type="button"
            className={`${styles.chip} ${isActive ? styles.active : ""}`}
            onClick={() => onSelect(name)}
            aria-pressed={isActive}
          >
            {name}
            <span className={styles.count}>{count}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default CategoryFilter
