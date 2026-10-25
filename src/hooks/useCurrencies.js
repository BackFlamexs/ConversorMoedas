import { useEffect, useState } from 'react'
import { getCurrencies } from '../services/frankfurter.js'

export function useCurrencies() {
  const [currencies, setCurrencies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadCurrencies() {
      setIsLoading(true)
      setError('')

      try {
        const currencyList = await getCurrencies()
        if (isActive) setCurrencies(currencyList)
      } catch (fetchError) {
        if (isActive) setError(fetchError.message || 'Ocorreu um erro ao carregar as moedas.')
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    loadCurrencies()
    return () => { isActive = false }
  }, [reloadCount])

  function retry() {
    setReloadCount((count) => count + 1)
  }

  return { currencies, isLoading, error, retry }
}
