import { useCallback, useMemo, useRef, useState } from "react"
import { ConfirmContext } from "../contexts/ConfirmContext"
import ConfirmModal from "../components/ConfirmModal/ConfirmModal"

export const ConfirmProvider = ({ children }) => {
  const [options, setOptions] = useState(null)
  const resolverRef = useRef(null)

  const confirm = useCallback(
    (opts) =>
      new Promise((resolve) => {
        resolverRef.current?.(false)
        resolverRef.current = resolve
        setOptions(opts)
      }),
    [],
  )

  const close = (result) => {
    resolverRef.current?.(result)
    resolverRef.current = null
    setOptions(null)
  }

  const value = useMemo(() => ({ confirm }), [confirm])

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmModal
        {...options}
        isOpen={options !== null}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    </ConfirmContext.Provider>
  )
}
