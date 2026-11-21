import { useEffect, useRef } from "react"
import styles from "./ConfirmModal.module.css"

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "primary",
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const handleCancel = (e) => {
    e.preventDefault()
    onCancel()
  }

  const handleClick = (e) => {
    if (e.target === dialogRef.current) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={handleCancel}
      onClick={handleClick}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-message"
    >
      {isOpen && (
        <div className={styles.content}>
          <h2 id="confirm-modal-title" className={styles.title}>
            {title}
          </h2>
          {message && (
            <div id="confirm-modal-message" className={styles.message}>
              {message}
            </div>
          )}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`${styles.confirmButton} ${variant === "danger" ? styles.danger : ""}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}

export default ConfirmModal
