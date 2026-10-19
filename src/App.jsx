import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ConverterForm from './components/ConverterForm.jsx'
import PageFooter from './components/PageFooter.jsx'
import { getCurrencies } from './services/frankfurter.js'
import './App.css'

const initialAmount = '100'
const initialFromCurrency = 'BRL'
const initialToCurrency = 'USD'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true)
  const [currencyError, setCurrencyError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadCurrencies() {
      setIsLoadingCurrencies(true)
      setCurrencyError('')

      try {
        const currencyList = await getCurrencies()
        if (isActive) setCurrencies(currencyList)
      } catch (error) {
        if (isActive) setCurrencyError(error.message || 'Ocorreu um erro ao carregar as moedas.')
      } finally {
        if (isActive) setIsLoadingCurrencies(false)
      }
    }

    loadCurrencies()
    return () => { isActive = false }
  }, [reloadCount])

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
            <button type="button" onClick={() => setReloadCount((count) => count + 1)}>
              Tentar novamente
            </button>
          </div>
        )}

        <ConverterForm
          currencies={currencies}
          isLoadingCurrencies={isLoadingCurrencies}
          initialAmount={initialAmount}
          initialFromCurrency={initialFromCurrency}
          initialToCurrency={initialToCurrency}
        />

        <div className="card-footer">
          <span><span className="secure-dot" /> Sem taxas escondidas</span>
          <span>Lista de moedas obtida pela API Frankfurter</span>
        </div>
      </section>

      <PageFooter projectName="CONVERSOR DE MOEDAS" description="Um projeto de aprendizado em React" />
    </main>
  )
}

export default App
