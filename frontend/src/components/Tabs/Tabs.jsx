import { useRef } from "react"
import styles from "./Tabs.module.css"

const getTabIds =(idPrefix, tabId) => ({
  tab: `${idPrefix}-tab-${tabId}`,
  panel: `${idPrefix}-panel-${tabId}`,
})

function Tabs({ tabs, activeTab, onChange, idPrefix, label }) {
  const tabRefs = useRef({})

  const handleKeyDown = (e) => {
    const index = tabs.findIndex((tab) => tab.id === activeTab)
    let nextIndex = null

    if (e.key === "ArrowRight") nextIndex = (index + 1) % tabs.length
    if (e.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length
    if (e.key === "Home") nextIndex = 0
    if (e.key === "End") nextIndex = tabs.length - 1
    if (nextIndex === null) return

    e.preventDefault()
    const nextTab = tabs[nextIndex]
    onChange(nextTab.id)
    tabRefs.current[nextTab.id]?.focus()
  }

  return (
    <div
      className={styles.tabList}
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        const ids = getTabIds(idPrefix, tab.id)

        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el
            }}
            id={ids.tab}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={ids.panel}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span className={styles.badge}>{tab.badge}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export function TabPanel({ idPrefix, tabId, children, className }) {
  const ids = getTabIds(idPrefix, tabId)
  return (
    <div
      id={ids.panel}
      className={className}
      role="tabpanel"
      aria-labelledby={ids.tab}
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export default Tabs
