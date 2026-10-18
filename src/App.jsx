import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ConverterForm from './components/ConverterForm.jsx'
import PageFooter from './components/PageFooter.jsx'
import './App.css'

const currencies = [
  { code: 'BRL', name: 'Real brasileiro' },
  { code: 'USD', name: 'Dólar americano' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'Libra esterlina' },
]
const initialAmount = '100'
const initialFromCurrency = 'BRL'
const initialToCurrency = 'USD'

function App() {
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
          <span className="date-badge">Prévia da interface</span>
        </div>

        <ConverterForm
          currencies={currencies}
          initialAmount={initialAmount}
          initialFromCurrency={initialFromCurrency}
          initialToCurrency={initialToCurrency}
        />

        <div className="card-footer">
          <span><span className="secure-dot" /> Sem taxas escondidas</span>
          <span>API Frankfurter na próxima etapa</span>
        </div>
      </section>

      <PageFooter
        projectName="CONVERSOR DE MOEDAS"
        description="Um projeto de aprendizado em React"
      />
    </main>
  )
}

export default App
