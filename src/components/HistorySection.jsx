import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useHistoricalRates } from '../hooks/useHistoricalRates.js'
import styles from './HistorySection.module.css'

const periods = [
  { value: '7d', key: 'days', n: 7 }, { value: '15d', key: 'days', n: 15 },
  { value: '30d', key: 'days', n: 30 }, { value: '3m', key: 'months', n: 3 },
  { value: '6m', key: 'months', n: 6 }, { value: '1y', key: 'year', n: 1 },
  { value: '5y', key: 'years', n: 5 }, { value: '10y', key: 'years', n: 10 },
]

function HistorySection({ fromCurrency, toCurrency, t, language }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [filters, setFilters] = useState({ startDate: '', endDate: '', minRate: '', maxRate: '' })
  const [sortConfig, setSortConfig] = useState({ field: 'date', direction: 'desc' })
  const { history, isLoading, error, retry: retryHistory } = useHistoricalRates(fromCurrency, toCurrency, selectedPeriod)
  const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString(language)
  const formatChartDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString(language, { day: '2-digit', month: '2-digit' })
  const formatRate = (rate, digits = 6) => Number(rate).toLocaleString(language, { maximumFractionDigits: digits })
  const firstRecord = history[0]
  const lastRecord = history[history.length - 1]
  const hasInvalidDateRange = filters.startDate && filters.endDate && filters.startDate > filters.endDate
  const hasInvalidRateRange = filters.minRate !== '' && filters.maxRate !== '' && Number(filters.minRate) > Number(filters.maxRate)
  const filterError = hasInvalidDateRange ? t('invalidDates') : hasInvalidRateRange ? t('invalidRates') : ''
  const filteredHistory = filterError ? [] : history.filter((record) => (
    (!filters.startDate || record.date >= filters.startDate)
    && (!filters.endDate || record.date <= filters.endDate)
    && (filters.minRate === '' || record.rate >= Number(filters.minRate))
    && (filters.maxRate === '' || record.rate <= Number(filters.maxRate))
  ))
  const sortedHistory = [...filteredHistory].sort((firstRecord, secondRecord) => {
    const comparison = sortConfig.field === 'date'
      ? firstRecord.date.localeCompare(secondRecord.date)
      : firstRecord.rate - secondRecord.rate
    return sortConfig.direction === 'asc' ? comparison : -comparison
  })
  const hasActiveFilters = Object.values(filters).some(Boolean)

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  function clearFilters() { setFilters({ startDate: '', endDate: '', minRate: '', maxRate: '' }) }

  function exportHistoryCsv() {
    if (sortedHistory.length === 0) return
    const csvCell = (value) => `"${String(value).replaceAll('"', '""')}"`
    const rows = [
      [t('csvDate'), t('csvFrom'), t('csvTo'), t('csvRate')],
      ...sortedHistory.map((record) => [record.date, record.base || fromCurrency, record.quote || toCurrency, record.rate]),
    ]
    const csvContent = `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`
    const file = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')
    downloadLink.href = fileUrl
    downloadLink.download = `${t('csvName')}-${fromCurrency}-${toCurrency}-${selectedPeriod}.csv`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
  }

  function handleSort(field) {
    setSortConfig((current) => ({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  function getSortIndicator(field) {
    if (sortConfig.field !== field) return '↕'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  return (
    <section className={styles.historySection} aria-labelledby="history-title">
      <div className={styles.historyHeading}>
        <p className={styles.sectionKicker}>{t('analysis')}</p>
        <h2 id="history-title">{t('historyTitle')}</h2>
        <p>{t('historyDescription', { from: fromCurrency, to: toCurrency })}</p>
      </div>

      <div className={styles.periodSelector} role="group" aria-label={t('historyPeriod')}>
        {periods.map((period) => (
          <button key={period.value} type="button"
            className={selectedPeriod === period.value ? `${styles.periodButton} ${styles.isSelected}` : styles.periodButton}
            aria-pressed={selectedPeriod === period.value}
            onClick={() => setSelectedPeriod(period.value)}>
            {period.key === 'year' ? t('year') : t(period.key, { n: period.n })}
          </button>
        ))}
      </div>

      <div className={styles.historyCard}>
        <div className={styles.historyCardHeading}>
          <span>{t('pair', { from: fromCurrency, to: toCurrency })}</span>
          <span>{(() => { const p = periods.find((item) => item.value === selectedPeriod); return p.key === 'year' ? t('year') : t(p.key, { n: p.n }) })()}</span>
        </div>

        {isLoading && <p className={styles.historyMessage} role="status">{t('loadingHistory')}</p>}
        {!isLoading && error && (
          <div className={styles.historyError} role="alert">
            <p>{fromCurrency === toCurrency ? t('sameCurrencyHistory') : t('historyError')}</p>
            {fromCurrency !== toCurrency && <button type="button" onClick={retryHistory}>{t('retry')}</button>}
          </div>
        )}
        {!isLoading && !error && history.length === 0 && <p className={styles.historyMessage}>{t('noHistory')}</p>}

        {!isLoading && !error && history.length > 0 && (
          <>
            <div className={styles.historySummary}>
              <p>{t('receivedRecords', { n: history.length })}</p>
              <p>{t('dateRange', { start: formatDate(firstRecord.date), end: formatDate(lastRecord.date) })}</p>
              <p>{t('latestInRange', { rate: formatRate(lastRecord.rate), currency: toCurrency })}</p>
            </div>

            <div className={styles.historyChart} role="img" aria-label={t('chartLabel', { from: fromCurrency, to: toCurrency })}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 18, right: 12, bottom: 4, left: 4 }}>
                  <CartesianGrid stroke="#dbe6f1" strokeDasharray="4 5" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatChartDate} tick={{ fill: '#71869b', fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={32} />
                  <YAxis dataKey="rate" domain={['auto', 'auto']} tickFormatter={(value) => formatRate(value, 4)} tick={{ fill: '#71869b', fontSize: 11 }} tickLine={false} axisLine={false} width={58} />
                  <Tooltip labelFormatter={formatDate} formatter={(value) => [`${formatRate(value)} ${toCurrency}`, `1 ${fromCurrency}`]} contentStyle={{ borderRadius: 10, borderColor: '#d7e3ef' }} />
                  <Line type="monotone" dataKey="rate" name={`${fromCurrency}/${toCurrency}`} stroke="#2563eb" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 2, fill: '#ffffff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.historyTableSection}>
              <h3>{t('details')}</h3>
              <div className={styles.historyFilters} aria-label={t('filters')}>
                <label className={styles.historyFilterField} htmlFor="filter-start-date"><span>{t('startDate')}</span><input id="filter-start-date" name="startDate" type="date" value={filters.startDate} onChange={handleFilterChange} /></label>
                <label className={styles.historyFilterField} htmlFor="filter-end-date"><span>{t('endDate')}</span><input id="filter-end-date" name="endDate" type="date" value={filters.endDate} onChange={handleFilterChange} /></label>
                <label className={styles.historyFilterField} htmlFor="filter-min-rate"><span>{t('minRate')}</span><input id="filter-min-rate" name="minRate" type="number" min="0" step="any" placeholder={t('minPlaceholder')} value={filters.minRate} onChange={handleFilterChange} /></label>
                <label className={styles.historyFilterField} htmlFor="filter-max-rate"><span>{t('maxRate')}</span><input id="filter-max-rate" name="maxRate" type="number" min="0" step="any" placeholder={t('maxPlaceholder')} value={filters.maxRate} onChange={handleFilterChange} /></label>
                <button className={styles.clearHistoryFilters} type="button" onClick={clearFilters} disabled={!hasActiveFilters}>{t('clearFilters')}</button>
                <button className={styles.exportHistoryButton} type="button" onClick={exportHistoryCsv} disabled={sortedHistory.length === 0}>{t('exportCsv', { n: sortedHistory.length })}</button>
              </div>

              {filterError && <p className={styles.historyFilterError} role="alert">{filterError}</p>}
              <p className={styles.historyResultCount} aria-live="polite">
                {filteredHistory.length} {t(filteredHistory.length === 1 ? 'oneResult' : 'manyResults')}
                {hasActiveFilters && !filterError ? t('ofRecords', { n: history.length }) : ''}
              </p>

              <div className={styles.historyTableWrapper}>
                <table className={styles.historyTable}>
                  <thead><tr>
                    <th scope="col" aria-sort={sortConfig.field === 'date' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}><button className={styles.sortHeaderButton} type="button" aria-label={t(sortConfig.field === 'date' ? (sortConfig.direction === 'asc' ? 'sortDesc' : 'sortAsc') : 'sortAsc')} onClick={() => handleSort('date')}>{t('date')} <span aria-hidden="true">{getSortIndicator('date')}</span></button></th>
                    <th scope="col">{t('sourceCurrency')}</th>
                    <th scope="col">{t('targetCurrency')}</th>
                    <th scope="col" aria-sort={sortConfig.field === 'rate' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}><button className={styles.sortHeaderButton} type="button" aria-label={t(sortConfig.field === 'rate' ? (sortConfig.direction === 'asc' ? 'sortDesc' : 'sortAsc') : 'sortAsc')} onClick={() => handleSort('rate')}>{t('rate')} <span aria-hidden="true">{getSortIndicator('rate')}</span></button></th>
                  </tr></thead>
                  <tbody>
                    {sortedHistory.length > 0 ? sortedHistory.map((record) => (
                      <tr key={`${record.date}-${record.base}-${record.quote}`}>
                        <td>{formatDate(record.date)}</td><td>{record.base || fromCurrency}</td><td>{record.quote || toCurrency}</td><td>{formatRate(record.rate)}</td>
                      </tr>
                    )) : <tr><td className={styles.historyEmptyCell} colSpan="4">{t('noMatches')}</td></tr>}
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
