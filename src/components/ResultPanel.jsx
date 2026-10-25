import styles from './ResultPanel.module.css'

function ResultPanel({ targetCurrency, result, baseCurrency, exchangeRate, quoteDate, isLoadingRate, rateError, onRetryRate }) {
  const formattedRate = typeof exchangeRate === 'number'
    ? exchangeRate.toLocaleString('pt-BR', { maximumFractionDigits: 6 })
    : null

  return (
    <section className={styles.resultPanel} aria-label="Resultado da conversão">
      <div className={styles.resultHeading}>
        <span className={styles.resultLabel}>VALOR CONVERTIDO</span>
        <span className={styles.resultCurrency}>{targetCurrency}</span>
      </div>
      <output className={styles.resultValue}>{result ?? '—'}</output>

      <div className={styles.rateNote} aria-live="polite">
        <span className={styles.rateIcon} aria-hidden="true">i</span>
        <div>
          {isLoadingRate && <p>Consultando a cotação atual...</p>}
          {!isLoadingRate && rateError && (
            <>
              <p>{rateError}</p>
              <button className={styles.retryRateButton} type="button" onClick={onRetryRate}>Tentar novamente</button>
            </>
          )}
          {!isLoadingRate && !rateError && formattedRate && (
            <>
              <p>Taxa utilizada: 1 {baseCurrency} = {formattedRate} {targetCurrency}</p>
              <p>{quoteDate ? `Data efetiva da cotação: ${quoteDate}` : 'Mesma moeda: taxa equivalente a 1.'}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ResultPanel
