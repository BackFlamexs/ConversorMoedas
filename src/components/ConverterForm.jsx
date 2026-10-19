import { useEffect, useState } from 'react'
import ResultPanel from './ResultPanel.jsx'
import { getLatestRate } from '../services/frankfurter.js'

function ConverterForm({ currencies, isLoadingCurrencies, initialAmount, initialFromCurrency, initialToCurrency }) {
  const [amount, setAmount] = useState(initialAmount)
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency)
  const [toCurrency, setToCurrency] = useState(initialToCurrency)
  const [exchangeRate, setExchangeRate] = useState(null)
  const [isLoadingRate, setIsLoadingRate] = useState(true)
  const [rateError, setRateError] = useState('')
  const [rateReloadCount, setRateReloadCount] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadRate() {
      setIsLoadingRate(true)
      setRateError('')
      setExchangeRate(null)

      if (fromCurrency === toCurrency) {
        setExchangeRate({ base: fromCurrency, quote: toCurrency, rate: 1, date: null })
        setIsLoadingRate(false)
        return
      }

      try {
        const rateData = await getLatestRate(fromCurrency, toCurrency)
        if (isActive) setExchangeRate(rateData)
      } catch (fetchError) {
        if (isActive) setRateError(fetchError.message || 'Ocorreu um erro ao carregar a cotação.')
      } finally {
        if (isActive) setIsLoadingRate(false)
      }
    }

    loadRate()
    return () => { isActive = false }
  }, [fromCurrency, toCurrency, rateReloadCount])

  function handleConvert(event) {
    event.preventDefault()
    const numericAmount = Number(amount)

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setResult(null)
      setError('Informe um valor maior que zero.')
      return
    }

    if (!exchangeRate) {
      setResult(null)
      setError('Aguarde uma cotação válida para realizar a conversão.')
      return
    }

    const convertedAmount = numericAmount * exchangeRate.rate
    setResult(convertedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setError('')
  }

  function handleAmountChange(event) {
    setAmount(event.target.value)
    setResult(null)
    setError('')
  }

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value)
    setResult(null)
    setError('')
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value)
    setResult(null)
    setError('')
  }

  const currenciesDisabled = isLoadingCurrencies || currencies.length === 0
  const convertDisabled = currenciesDisabled || isLoadingRate || !exchangeRate
  const formattedQuoteDate = exchangeRate?.date
    ? new Date(`${exchangeRate.date}T00:00:00`).toLocaleDateString('pt-BR')
    : null

  return (
    <form onSubmit={handleConvert}>
      <div className="conversion-fields">
        <div className="field-group">
          <label htmlFor="amount">Você envia</label>
          <div className="field-control amount-control">
            <input id="amount" type="number" min="0" step="0.01" value={amount} onChange={handleAmountChange} />
            <span className="field-divider" aria-hidden="true" />
            <select id="from-currency" aria-label="Moeda de origem" value={fromCurrency} onChange={handleFromCurrencyChange} disabled={currenciesDisabled}>
              {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code}</option>)}
            </select>
          </div>
        </div>

        <div className="swap-indicator" aria-hidden="true">↔</div>

        <div className="field-group">
          <label htmlFor="to-currency">Você recebe</label>
          <div className="field-control currency-control">
            <span className="result-placeholder">{result ?? '—'}</span>
            <span className="field-divider" aria-hidden="true" />
            <select id="to-currency" aria-label="Moeda de destino" value={toCurrency} onChange={handleToCurrencyChange} disabled={currenciesDisabled}>
              {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code}</option>)}
            </select>
          </div>
        </div>
      </div>

      <button className="convert-button" type="submit" disabled={convertDisabled}>
        {isLoadingRate ? 'Consultando cotação...' : 'Converter'}
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}

      <ResultPanel
        targetCurrency={toCurrency}
        result={result}
        baseCurrency={fromCurrency}
        exchangeRate={exchangeRate?.rate}
        quoteDate={formattedQuoteDate}
        isLoadingRate={isLoadingRate}
        rateError={rateError}
        onRetryRate={() => setRateReloadCount((count) => count + 1)}
      />
    </form>
  )
}

export default ConverterForm
