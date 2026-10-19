import { useEffect, useState } from 'react'
import { getHistoricalRates } from '../services/frankfurter.js'
import { getDateRange } from '../utils/dateRanges.js'

const periods = [
  { value: '7d', label: '7 dias' },
  { value: '15d', label: '15 dias' },
  { value: '30d', label: '30 dias' },
  { value: '3m', label: '3 meses' },
  { value: '6m', label: '6 meses' },
  { value: '1y', label: '1 ano' },
  { value: '5y', label: '5 anos' },
  { value: '10y', label: '10 anos' },
]

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR')
}

function HistorySection({ fromCurrency, toCurrency }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
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
        const { startDate, endDate } = getDateRange(selectedPeriod)
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
  }, [fromCurrency, toCurrency, selectedPeriod, reloadCount])

  const firstRecord = history[0]
  const lastRecord = history[history.length - 1]

  return (
    <section className="history-section" aria-labelledby="history-title">
      <div className="history-heading">
        <p className="section-kicker">ANÁLISE</p>
        <h2 id="history-title">Histórico de cotação</h2>
        <p>Acompanhe a variação de {fromCurrency}/{toCurrency} ao longo do tempo.</p>
      </div>

      <div className="period-selector" role="group" aria-label="Período do histórico">
        {periods.map((period) => (
          <button
            key={period.value}
            type="button"
            className={selectedPeriod === period.value ? 'period-button is-selected' : 'period-button'}
            aria-pressed={selectedPeriod === period.value}
            onClick={() => setSelectedPeriod(period.value)}
          >
            {period.label}
          </button>
        ))}
      </div>

      <div className="history-card" aria-live="polite">
        <div className="history-card-heading">
          <span>{fromCurrency} → {toCurrency}</span>
          <span>{periods.find((period) => period.value === selectedPeriod)?.label}</span>
        </div>

        {isLoading && <p className="history-message" role="status">Carregando cotações históricas...</p>}

        {!isLoading && error && (
          <div className="history-error" role="alert">
            <p>{error}</p>
            {fromCurrency !== toCurrency && (
              <button type="button" onClick={() => setReloadCount((count) => count + 1)}>Tentar novamente</button>
            )}
          </div>
        )}

        {!isLoading && !error && history.length === 0 && (
          <p className="history-message">Não há cotações disponíveis para esse período.</p>
        )}

        {!isLoading && !error && history.length > 0 && (
          <div className="history-summary">
            <p><strong>{history.length}</strong> registros recebidos da API</p>
            <p>Intervalo retornado: {formatDate(firstRecord.date)} a {formatDate(lastRecord.date)}</p>
            <p>Cotação mais recente no intervalo: {lastRecord.rate.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} {toCurrency}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default HistorySection
