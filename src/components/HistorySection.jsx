import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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

function formatChartDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

function HistorySection({ fromCurrency, toCurrency }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [history, setHistory] = useState([])
  const [filters, setFilters] = useState({ startDate: '', endDate: '', minRate: '', maxRate: '' })
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
  const hasInvalidDateRange = filters.startDate && filters.endDate && filters.startDate > filters.endDate
  const hasInvalidRateRange = filters.minRate !== '' && filters.maxRate !== ''
    && Number(filters.minRate) > Number(filters.maxRate)
  const filterError = hasInvalidDateRange
    ? 'A data inicial deve ser anterior ou igual à data final.'
    : hasInvalidRateRange
      ? 'A cotação mínima deve ser menor ou igual à cotação máxima.'
      : ''
  const filteredHistory = filterError
    ? []
    : history.filter((record) => {
      const matchesStartDate = !filters.startDate || record.date >= filters.startDate
      const matchesEndDate = !filters.endDate || record.date <= filters.endDate
      const matchesMinRate = filters.minRate === '' || record.rate >= Number(filters.minRate)
      const matchesMaxRate = filters.maxRate === '' || record.rate <= Number(filters.maxRate)

      return matchesStartDate && matchesEndDate && matchesMinRate && matchesMaxRate
    })
  const hasActiveFilters = Object.values(filters).some(Boolean)

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }))
  }

  function clearFilters() {
    setFilters({ startDate: '', endDate: '', minRate: '', maxRate: '' })
  }

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

      <div className="history-card">
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
          <>
            <div className="history-summary">
              <p><strong>{history.length}</strong> registros recebidos da API</p>
              <p>Intervalo retornado: {formatDate(firstRecord.date)} a {formatDate(lastRecord.date)}</p>
              <p>Cotação mais recente no intervalo: {lastRecord.rate.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} {toCurrency}</p>
            </div>

            <div className="history-chart" role="img" aria-label={`Gráfico histórico de ${fromCurrency} para ${toCurrency}`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 18, right: 12, bottom: 4, left: 4 }}>
                  <CartesianGrid stroke="#dbe6f1" strokeDasharray="4 5" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatChartDate}
                    tick={{ fill: '#71869b', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={32}
                  />
                  <YAxis
                    dataKey="rate"
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => Number(value).toLocaleString('pt-BR', { maximumFractionDigits: 4 })}
                    tick={{ fill: '#71869b', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={58}
                  />
                  <Tooltip
                    labelFormatter={(date) => formatDate(date)}
                    formatter={(value) => [
                      `${Number(value).toLocaleString('pt-BR', { maximumFractionDigits: 6 })} ${toCurrency}`,
                      `1 ${fromCurrency}`,
                    ]}
                    contentStyle={{ borderRadius: 10, borderColor: '#d7e3ef' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    name={`${fromCurrency}/${toCurrency}`}
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2, fill: '#ffffff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="history-table-section">
              <h3>Dados detalhados</h3>
              <div className="history-filters" aria-label="Filtros do histórico">
                <label className="history-filter-field" htmlFor="filter-start-date">
                  <span>Data inicial</span>
                  <input id="filter-start-date" name="startDate" type="date" value={filters.startDate} onChange={handleFilterChange} />
                </label>
                <label className="history-filter-field" htmlFor="filter-end-date">
                  <span>Data final</span>
                  <input id="filter-end-date" name="endDate" type="date" value={filters.endDate} onChange={handleFilterChange} />
                </label>
                <label className="history-filter-field" htmlFor="filter-min-rate">
                  <span>Cotação mínima</span>
                  <input id="filter-min-rate" name="minRate" type="number" min="0" step="any" placeholder="Ex.: 4,90" value={filters.minRate} onChange={handleFilterChange} />
                </label>
                <label className="history-filter-field" htmlFor="filter-max-rate">
                  <span>Cotação máxima</span>
                  <input id="filter-max-rate" name="maxRate" type="number" min="0" step="any" placeholder="Ex.: 5,20" value={filters.maxRate} onChange={handleFilterChange} />
                </label>
                <button className="clear-history-filters" type="button" onClick={clearFilters} disabled={!hasActiveFilters}>
                  Limpar filtros
                </button>
              </div>

              {filterError && <p className="history-filter-error" role="alert">{filterError}</p>}
              <p className="history-result-count" aria-live="polite">
                {filteredHistory.length} {filteredHistory.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                {hasActiveFilters && !filterError && ` de ${history.length} registros`}
              </p>

              <div className="history-table-wrapper">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th scope="col">Data</th>
                      <th scope="col">Moeda de origem</th>
                      <th scope="col">Moeda de destino</th>
                      <th scope="col">Cotação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.length > 0 ? filteredHistory.map((record) => (
                        <tr key={`${record.date}-${record.base}-${record.quote}`}>
                          <td>{formatDate(record.date)}</td>
                          <td>{record.base || fromCurrency}</td>
                          <td>{record.quote || toCurrency}</td>
                          <td>{record.rate.toLocaleString('pt-BR', { maximumFractionDigits: 6 })}</td>
                        </tr>
                      )) : (
                        <tr><td className="history-empty-cell" colSpan="4">Nenhum registro corresponde aos filtros.</td></tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default HistorySection
