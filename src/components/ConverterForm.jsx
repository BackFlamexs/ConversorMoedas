import { useEffect, useState } from 'react'
import ResultPanel from './ResultPanel.jsx'
import { getLatestRate } from '../services/frankfurter.js'
import styles from './ConverterForm.module.css'

function ConverterForm({ currencies, isLoadingCurrencies, fromCurrency, toCurrency, onFromCurrencyChange, onToCurrencyChange, onSwapCurrencies, initialAmount, t, language }) {
  const [amount, setAmount] = useState(initialAmount)
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
      setResult(null)
      setError('')
      if (fromCurrency === toCurrency) {
        setExchangeRate({ base: fromCurrency, quote: toCurrency, rate: 1, date: null })
        setIsLoadingRate(false)
        return
      }
      try {
        const rateData = await getLatestRate(fromCurrency, toCurrency)
        if (isActive) setExchangeRate(rateData)
      } catch {
        if (isActive) setRateError(t('rateError'))
      } finally {
        if (isActive) setIsLoadingRate(false)
      }
    }
    loadRate()
    return () => { isActive = false }
  }, [fromCurrency, toCurrency, rateReloadCount, t])

  function handleConvert(event) {
    event.preventDefault()
    const numericAmount = Number(amount)
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setResult(null)
      setError(t('invalidAmount'))
      return
    }
    if (!exchangeRate) {
      setResult(null)
      setError(t('waitRate'))
      return
    }
    const convertedAmount = numericAmount * exchangeRate.rate
    setResult(convertedAmount.toLocaleString(language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setError('')
  }

  function clearResult() { setResult(null); setError('') }
  function handleAmountChange(event) { setAmount(event.target.value); clearResult() }
  function handleFromCurrencyChange(event) { onFromCurrencyChange(event.target.value); clearResult() }
  function handleToCurrencyChange(event) { onToCurrencyChange(event.target.value); clearResult() }

  const currenciesDisabled = isLoadingCurrencies || currencies.length === 0
  const convertDisabled = currenciesDisabled || isLoadingRate || !exchangeRate
  const formattedQuoteDate = exchangeRate?.date
    ? new Date(`${exchangeRate.date}T00:00:00`).toLocaleDateString(language)
    : null

  return (
    <form onSubmit={handleConvert}>
      <div className={styles.conversionFields}>
        <div className={styles.fieldGroup}>
          <label htmlFor="amount">{t('send')}</label>
          <div className={styles.fieldControl}>
            <input id="amount" type="number" min="0" step="0.01" value={amount} onChange={handleAmountChange} />
            <span className={styles.fieldDivider} aria-hidden="true" />
            <select id="from-currency" aria-label={t('fromCurrency')} value={fromCurrency} onChange={handleFromCurrencyChange} disabled={currenciesDisabled}>
              {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code}</option>)}
            </select>
          </div>
        </div>
        <button className={styles.swapIndicator} type="button" aria-label={t('swap')} title={t('swap')} onClick={onSwapCurrencies} disabled={currenciesDisabled}>↔</button>
        <div className={styles.fieldGroup}>
          <label htmlFor="to-currency">{t('receive')}</label>
          <div className={styles.fieldControl}>
            <span className={styles.resultPlaceholder}>{result ?? '—'}</span>
            <span className={styles.fieldDivider} aria-hidden="true" />
            <select id="to-currency" aria-label={t('toCurrency')} value={toCurrency} onChange={handleToCurrencyChange} disabled={currenciesDisabled}>
              {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code}</option>)}
            </select>
          </div>
        </div>
      </div>
      <button className={styles.convertButton} type="submit" disabled={convertDisabled}>
        {isLoadingRate ? t('loadingRateButton') : t('convert')}
      </button>
      {error && <p className={styles.formError} role="alert">{error}</p>}
      <ResultPanel
        targetCurrency={toCurrency}
        result={result}
        baseCurrency={fromCurrency}
        exchangeRate={exchangeRate?.rate}
        quoteDate={formattedQuoteDate}
        isLoadingRate={isLoadingRate}
        rateError={rateError}
        onRetryRate={() => setRateReloadCount((count) => count + 1)}
        t={t}
        language={language}
      />
    </form>
  )
}

export default ConverterForm
