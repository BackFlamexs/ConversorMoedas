import { useEffect, useState } from 'react'
import { getHistoricalRates } from '../services/frankfurter.js'
import { getDateRange } from '../utils/dateRanges.js'

export function useHistoricalRates(fromCurrency, toCurrency, period) {
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadHistory() {
      setIsLoading(true)
      setError('')
      setHistory([])

      if (fromCurrency === toCurrency) {
        setError('Selecione duas moedas diferentes para consultar o histórico.')
        setIsLoading(false)
        return
      }

      try {
        const { startDate, endDate } = getDateRange(period)
        const historyData = await getHistoricalRates(fromCurrency, toCurrency, startDate, endDate)
        if (isActive) setHistory(historyData)
      } catch (fetchError) {
        if (isActive) setError(fetchError.message || 'Ocorreu um erro ao carregar o histórico.')
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    loadHistory()
    return () => { isActive = false }
  }, [fromCurrency, toCurrency, period, reloadCount])

  function retry() {
    setReloadCount((count) => count + 1)
  }

  return { history, isLoading, error, retry }
}
