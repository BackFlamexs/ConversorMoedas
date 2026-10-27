import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ConverterForm from './components/ConverterForm.jsx'
import HistorySection from './components/HistorySection.jsx'
import PageFooter from './components/PageFooter.jsx'
import { useCurrencies } from './hooks/useCurrencies.js'
import styles from './App.module.css'

const initialAmount = '100'
const initialFromCurrency = 'BRL'
const initialToCurrency = 'USD'

function App() {
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency)
  const [toCurrency, setToCurrency] = useState(initialToCurrency)
  const { t: translate, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || 'pt-BR'
  const t = translate
  const { currencies, isLoading: isLoadingCurrencies, error: currencyError, retry: retryCurrencies } = useCurrencies()

  useEffect(() => {
    document.title = t('pageTitle')
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = t('pageDescription')
  }, [language, t])

  function handleSwapCurrencies() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <main className={styles.appShell}>
      <Header brandName={t('brand')} language={language} onLanguageChange={(nextLanguage) => i18n.changeLanguage(nextLanguage)} t={t} />
      <Hero eyebrow={t('eyebrow')} titleStart={t('titleStart')} titleHighlight={t('titleHighlight')} description={t('heroDescription')} />

      <section className={styles.converterCard} aria-labelledby="converter-title">
        <div className={styles.cardHeading}>
          <div>
            <p className={styles.sectionKicker}>{t('converterKicker')}</p>
            <h2 id="converter-title">{t('makeConversion')}</h2>
          </div>
          <span className={styles.dateBadge}>{t('currencySource')}</span>
        </div>

        {isLoadingCurrencies && <p className={styles.apiStatus} role="status">{t('loadingCurrencies')}</p>}
        {currencyError && (
          <div className={styles.apiError} role="alert">
            <p>{t('currencyError')}</p>
            <button type="button" onClick={retryCurrencies}>{t('retry')}</button>
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
          t={t}
          language={language}
        />

        <div className={styles.cardFooter}>
          <span><span className={styles.secureDot} /> {t('noHiddenFees')}</span>
          <span>{t('currencyList')}</span>
        </div>
      </section>

      <HistorySection fromCurrency={fromCurrency} toCurrency={toCurrency} t={t} language={language} />
      <PageFooter projectName={t('project')} description={t('footer')} />
    </main>
  )
}

export default App
