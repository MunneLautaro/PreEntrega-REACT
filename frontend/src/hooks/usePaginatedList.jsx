import { useCallback, useEffect, useRef, useState } from "react"

export const usePaginatedList = (
  fetchPage,
  limit,
  { page: controlledPage, onPageChange } = {},
) => {
  const [internalPage, setInternalPage] = useState(1)
  const page = controlledPage ?? internalPage
  const setPage = onPageChange ?? setInternalPage
  const [reloadKey, setReloadKey] = useState(0)
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const setPageRef = useRef(setPage)

  useEffect(() => {
    setPageRef.current = setPage
  })

  useEffect(() => {
    let ignore = false

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const result = await fetchPage(page, limit)
        if (ignore) return

        if (result.items.length === 0 && page > 1) {
          setPageRef.current(Math.max(1, result.pagination.totalPages))
          return
        }

        setItems(result.items)
        setPagination(result.pagination)
      } catch (error) {
        if (!ignore) setError(error)
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [fetchPage, page, limit, reloadKey])

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  return { items, pagination, page, setPage, isLoading, error, reload }
}
