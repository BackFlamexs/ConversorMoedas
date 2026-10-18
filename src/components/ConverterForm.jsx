import { useState } from 'react'
import ResultPanel from './ResultPanel.jsx'

const demoRatesInBrl = {
  BRL: 1,
  USD: 5.7,
  EUR: 6.1,
  GBP: 7.2,
}

function ConverterForm({ currencies, initialAmount, initialFromCurrency, initialToCurrency }) {
  const [amount, setAmount] = useState(initialAmount)
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency)
  const [toCurrency, setToCurrency] = useState(initialToCurrency)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleConvert(event) {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setResult(null)
      setError('Informe um valor maior que zero.')
      return
    }

    const convertedAmount = numericAmount * demoRatesInBrl[fromCurrency] / demoRatesInBrl[toCurrency]
    setResult(convertedAmount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }))
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
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value)
    setResult(null)
  }

  return (
    <form onSubmit={handleConvert}>
      <div className="conversion-fields">
        <div className="field-group">
          <label htmlFor="amount">Você envia</label>
          <div className="field-control amount-control">
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={handleAmountChange}
            />
            <span className="field-divider" aria-hidden="true" />
            <select id="from-currency" aria-label="Moeda de origem" value={fromCurrency} onChange={handleFromCurrencyChange}>
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="swap-indicator" aria-hidden="true">↔</div>

        <div className="field-group">
          <label htmlFor="to-currency">Você recebe</label>
          <div className="field-control currency-control">
            <span className="result-placeholder">{result ?? '—'}</span>
            <span className="field-divider" aria-hidden="true" />
            <select id="to-currency" aria-label="Moeda de destino" value={toCurrency} onChange={handleToCurrencyChange}>
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className="convert-button" type="submit">Converter</button>

      {error && <p className="form-error" role="alert">{error}</p>}

      <ResultPanel
        targetCurrency={toCurrency}
        result={result}
        message="Taxas de demonstração para praticar a interação. A API Frankfurter será conectada depois."
      />
    </form>
  )
}

export default ConverterForm
