function ResultPanel({ targetCurrency, result, message }) {
  return (
    <section className="result-panel" aria-label="Resultado da conversão">
      <div className="result-heading">
        <span className="result-label">VALOR CONVERTIDO</span>
        <span className="result-currency">{targetCurrency}</span>
      </div>
      <output className="result-value">
        {result ?? '—'}
      </output>
      <div className="rate-note">
        <span className="rate-icon" aria-hidden="true">i</span>
        <p>{message}</p>
      </div>
    </section>
  )
}

export default ResultPanel
