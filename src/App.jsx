import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ConverterForm from './components/ConverterForm.jsx'
import HistorySection from './components/HistorySection.jsx'
import PageFooter from './components/PageFooter.jsx'
import { useCurrencies } from './hooks/useCurrencies.js'
import './App.css'

const initialAmount = '100'
const initialFromCurrency = 'BRL'
const initialToCurrency = 'USD'

function App() {
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency)
  const [toCurrency, setToCurrency] = useState(initialToCurrency)
  const { currencies, isLoading: isLoadingCurrencies, error: currencyError, retry: retryCurrencies } = useCurrencies()

  function handleSwapCurrencies() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <main className="app-shell">
      <Header brandName="câmbio" />

      <Hero
        eyebrow="SIMPLES, CLARO E ATUALIZADO"
        titleStart="Seu dinheiro,"
        titleHighlight="em qualquer moeda."
        description="Converta valores entre moedas e acompanhe as taxas de câmbio em um só lugar."
      />

      <section className="converter-card" aria-labelledby="converter-title">
        <div className="card-heading">
          <div>
            <p className="section-kicker">CONVERSOR</p>
            <h2 id="converter-title">Faça uma conversão</h2>
          </div>
          <span className="date-badge">Moedas da Frankfurter</span>
        </div>

        {isLoadingCurrencies && <p className="api-status" role="status">Carregando moedas disponíveis...</p>}

        {currencyError && (
          <div className="api-error" role="alert">
            <p>{currencyError}</p>
            <button type="button" onClick={retryCurrencies}>
              Tentar novamente
            </button>
          </div>
        )}

        <ConverterForm
          currencies={currencies}
          isLoadingCurrencies={isLoadingCurrencies}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          onFromCurrencyChange={setFromCurrency}
          onToCurrencyChange={setToCurrency}
          onSwapCurrencies={handleSwapCurrencies}
          initialAmount={initialAmount}
        />

        <div className="card-footer">
          <span><span className="secure-dot" /> Sem taxas escondidas</span>
          <span>Lista de moedas obtida pela API Frankfurter</span>
        </div>
      </section>

      <HistorySection fromCurrency={fromCurrency} toCurrency={toCurrency} />

      <PageFooter projectName="CONVERSOR DE MOEDAS" description="Um projeto de aprendizado em React" />
    </main>
  )
}

export default App
