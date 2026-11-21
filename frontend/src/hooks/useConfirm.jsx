import { useContext } from "react"
import { ConfirmContext } from "../contexts/ConfirmContext"

export const useConfirm = () => {
  const context = useContext(ConfirmContext)
  if (!context) {
    throw new Error("useConfirm debe ser usado dentro de un ConfirmProvider")
  }
  return context
}
