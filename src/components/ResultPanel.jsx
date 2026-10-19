function ResultPanel({ targetCurrency, result, baseCurrency, exchangeRate, quoteDate, isLoadingRate, rateError, onRetryRate }) {
  const formattedRate = typeof exchangeRate === 'number'
    ? exchangeRate.toLocaleString('pt-BR', { maximumFractionDigits: 6 })
    : null

  return (
    <section className="result-panel" aria-label="Resultado da conversão">
      <div className="result-heading">
        <span className="result-label">VALOR CONVERTIDO</span>
        <span className="result-currency">{targetCurrency}</span>
      </div>
      <output className="result-value">{result ?? '—'}</output>

      <div className="rate-note" aria-live="polite">
        <span className="rate-icon" aria-hidden="true">i</span>
        <div>
          {isLoadingRate && <p>Consultando a cotação atual...</p>}
          {!isLoadingRate && rateError && (
            <>
              <p>{rateError}</p>
              <button className="retry-rate-button" type="button" onClick={onRetryRate}>Tentar novamente</button>
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
