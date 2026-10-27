import styles from './ResultPanel.module.css'

function ResultPanel({ targetCurrency, result, baseCurrency, exchangeRate, quoteDate, isLoadingRate, rateError, onRetryRate, t, language }) {
  const formattedRate = typeof exchangeRate === 'number'
    ? exchangeRate.toLocaleString(language, { maximumFractionDigits: 6 })
    : null

  return (
    <section className={styles.resultPanel} aria-label={t('conversionResult')}>
      <div className={styles.resultHeading}>
        <span className={styles.resultLabel}>{t('convertedValue')}</span>
        <span className={styles.resultCurrency}>{targetCurrency}</span>
      </div>
      <output className={styles.resultValue}>{result ?? '—'}</output>
      <div className={styles.rateNote} aria-live="polite">
        <span className={styles.rateIcon} aria-hidden="true">i</span>
        <div>
          {isLoadingRate && <p>{t('currentRate')}</p>}
          {!isLoadingRate && rateError && (
            <>
              <p>{rateError}</p>
              <button className={styles.retryRateButton} type="button" onClick={onRetryRate}>{t('retry')}</button>
            </>
          )}
          {!isLoadingRate && !rateError && formattedRate && (
            <>
              <p>{t('rateUsed', { from: baseCurrency, rate: formattedRate, to: targetCurrency })}</p>
              <p>{quoteDate ? t('effectiveDate', { date: quoteDate }) : t('sameCurrency')}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ResultPanel
