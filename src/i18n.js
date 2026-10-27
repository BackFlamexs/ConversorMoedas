export const languages = [
  { code: 'pt-BR', flag: '????', label: 'Portugu�s do Brasil' },
  { code: 'en', flag: '????', label: 'English' },
  { code: 'es', flag: '????', label: 'Espa�ol' },
]

const translations = {
  'pt-BR': {
    home: 'início',
    pageTitle: 'Conversor de Moedas', pageDescription: 'Aplica��o para convers�o e an�lise de moedas.', currencyError: 'N�o foi poss�vel carregar a lista de moedas. Tente novamente.',
    language: 'Idioma', brand: 'c�mbio', converter: 'CONVERSOR DE MOEDAS', eyebrow: 'SIMPLES, CLARO E ATUALIZADO',
    titleStart: 'Seu dinheiro,', titleHighlight: 'em qualquer moeda.', heroDescription: 'Converta valores entre moedas e acompanhe as taxas de c�mbio em um s� lugar.',
    converterKicker: 'CONVERSOR', makeConversion: 'Fa�a uma convers�o', currencySource: 'Moedas da Frankfurter', loadingCurrencies: 'Carregando moedas dispon�veis...',
    retry: 'Tentar novamente', noHiddenFees: 'Sem taxas escondidas', currencyList: 'Lista de moedas obtida pela API Frankfurter',
    send: 'Voc� envia', receive: 'Voc� recebe', fromCurrency: 'Moeda de origem', toCurrency: 'Moeda de destino', swap: 'Inverter moedas',
    loadingRateButton: 'Consultando cota��o...', convert: 'Converter', invalidAmount: 'Informe um valor maior que zero.',
    waitRate: 'Aguarde uma cota��o v�lida para realizar a convers�o.', conversionResult: 'Resultado da convers�o', convertedValue: 'VALOR CONVERTIDO',
    currentRate: 'Consultando a cota��o atual...', rateUsed: 'Taxa utilizada: 1 {from} = {rate} {to}', effectiveDate: 'Data efetiva da cota��o: {date}', sameCurrency: 'Mesma moeda: taxa equivalente a 1.',
    analysis: 'AN�LISE', historyTitle: 'Hist�rico de cota��o', historyDescription: 'Acompanhe a varia��o de {from}/{to} ao longo do tempo.', historyPeriod: 'Per�odo do hist�rico',
    days: '{n} dias', months: '{n} meses', year: '1 ano', years: '{n} anos', pair: '{from} ? {to}', loadingHistory: 'Carregando cota��es hist�ricas...',
    noHistory: 'N�o h� cota��es dispon�veis para esse per�odo.', receivedRecords: '{n} registros recebidos da API', dateRange: 'Intervalo retornado: {start} a {end}',
    latestInRange: 'Cota��o mais recente no intervalo: {rate} {currency}', details: 'Dados detalhados', startDate: 'Data inicial', endDate: 'Data final',
    minRate: 'Cota��o m�nima', maxRate: 'Cota��o m�xima', clearFilters: 'Limpar filtros', exportCsv: 'Exportar CSV ({n})',
    invalidDates: 'A data inicial deve ser anterior ou igual � data final.', invalidRates: 'A cota��o m�nima deve ser menor ou igual � cota��o m�xima.',
    oneResult: 'resultado encontrado', manyResults: 'resultados encontrados', ofRecords: ' de {n} registros', noMatches: 'Nenhum registro corresponde aos filtros.',
    date: 'Data', sourceCurrency: 'Moeda de origem', targetCurrency: 'Moeda de destino', rate: 'Cota��o', sortBoth: 'Ordenar', sortAsc: 'Ordenar crescente', sortDesc: 'Ordenar decrescente',
    project: 'CONVERSOR DE MOEDAS', footer: 'Um projeto de aprendizado em React', csvDate: 'Data', csvFrom: 'Moeda de origem', csvTo: 'Moeda de destino', csvRate: 'Cota��o', csvName: 'historico',
    rateError: 'Não foi possível carregar a cotação. Tente novamente.', historyError: 'Não foi possível carregar o histórico. Tente novamente.',
    sameCurrencyHistory: 'Selecione duas moedas diferentes para consultar o histórico.', chartLabel: 'Gráfico histórico de {from} para {to}', filters: 'Filtros do histórico',
    minPlaceholder: 'Ex.: 4,90', maxPlaceholder: 'Ex.: 5,20',
  },
  en: {
    home: 'home',
    pageTitle: 'Currency Converter', pageDescription: 'Application for currency conversion and analysis.', currencyError: 'Could not load the currency list. Please try again.',
    language: 'Language', brand: 'exchange', converter: 'CURRENCY CONVERTER', eyebrow: 'SIMPLE, CLEAR AND UP TO DATE',
    titleStart: 'Your money,', titleHighlight: 'in any currency.', heroDescription: 'Convert between currencies and track exchange rates in one place.',
    converterKicker: 'CONVERTER', makeConversion: 'Make a conversion', currencySource: 'Currencies by Frankfurter', loadingCurrencies: 'Loading available currencies...',
    retry: 'Try again', noHiddenFees: 'No hidden fees', currencyList: 'Currency list provided by the Frankfurter API',
    send: 'You send', receive: 'You receive', fromCurrency: 'Source currency', toCurrency: 'Target currency', swap: 'Swap currencies',
    loadingRateButton: 'Fetching exchange rate...', convert: 'Convert', invalidAmount: 'Enter an amount greater than zero.',
    waitRate: 'Wait for a valid exchange rate before converting.', conversionResult: 'Conversion result', convertedValue: 'CONVERTED AMOUNT',
    currentRate: 'Fetching current exchange rate...', rateUsed: 'Rate used: 1 {from} = {rate} {to}', effectiveDate: 'Effective rate date: {date}', sameCurrency: 'Same currency: equivalent rate is 1.',
    analysis: 'ANALYSIS', historyTitle: 'Exchange rate history', historyDescription: 'Track {from}/{to} changes over time.', historyPeriod: 'History period',
    days: '{n} days', months: '{n} months', year: '1 year', years: '{n} years', pair: '{from} ? {to}', loadingHistory: 'Loading historical rates...',
    noHistory: 'No rates are available for this period.', receivedRecords: '{n} records received from the API', dateRange: 'Returned range: {start} to {end}',
    latestInRange: 'Latest rate in range: {rate} {currency}', details: 'Detailed data', startDate: 'Start date', endDate: 'End date',
    minRate: 'Minimum rate', maxRate: 'Maximum rate', clearFilters: 'Clear filters', exportCsv: 'Export CSV ({n})',
    invalidDates: 'The start date must be before or equal to the end date.', invalidRates: 'The minimum rate must be less than or equal to the maximum rate.',
    oneResult: 'result found', manyResults: 'results found', ofRecords: ' of {n} records', noMatches: 'No records match these filters.',
    date: 'Date', sourceCurrency: 'Source currency', targetCurrency: 'Target currency', rate: 'Rate', sortBoth: 'Sort', sortAsc: 'Sort ascending', sortDesc: 'Sort descending',
    project: 'CURRENCY CONVERTER', footer: 'A React learning project', csvDate: 'Date', csvFrom: 'Source currency', csvTo: 'Target currency', csvRate: 'Rate', csvName: 'history',
    rateError: 'Could not load the exchange rate. Please try again.', historyError: 'Could not load the history. Please try again.',
    sameCurrencyHistory: 'Select two different currencies to view the history.', chartLabel: 'Historical chart from {from} to {to}', filters: 'History filters',
    minPlaceholder: 'e.g. 4.90', maxPlaceholder: 'e.g. 5.20',
  },
  es: {
    home: 'inicio',
    pageTitle: 'Conversor de Divisas', pageDescription: 'Aplicaci�n para convertir y analizar monedas.', currencyError: 'No se pudo cargar la lista de monedas. Int�ntalo de nuevo.',
    language: 'Idioma', brand: 'cambio', converter: 'CONVERSOR DE DIVISAS', eyebrow: 'SENCILLO, CLARO Y ACTUALIZADO',
    titleStart: 'Tu dinero,', titleHighlight: 'en cualquier moneda.', heroDescription: 'Convierte valores entre monedas y consulta los tipos de cambio en un solo lugar.',
    converterKicker: 'CONVERSOR', makeConversion: 'Haz una conversi�n', currencySource: 'Monedas de Frankfurter', loadingCurrencies: 'Cargando monedas disponibles...',
    retry: 'Intentar de nuevo', noHiddenFees: 'Sin cargos ocultos', currencyList: 'Lista de monedas proporcionada por la API Frankfurter',
    send: 'Env�as', receive: 'Recibes', fromCurrency: 'Moneda de origen', toCurrency: 'Moneda de destino', swap: 'Invertir monedas',
    loadingRateButton: 'Consultando tipo de cambio...', convert: 'Convertir', invalidAmount: 'Introduce un valor mayor que cero.',
    waitRate: 'Espera un tipo de cambio v�lido para realizar la conversi�n.', conversionResult: 'Resultado de la conversi�n', convertedValue: 'VALOR CONVERTIDO',
    currentRate: 'Consultando el tipo de cambio actual...', rateUsed: 'Tipo utilizado: 1 {from} = {rate} {to}', effectiveDate: 'Fecha efectiva del tipo: {date}', sameCurrency: 'Misma moneda: tipo equivalente a 1.',
    analysis: 'AN�LISIS', historyTitle: 'Historial del tipo de cambio', historyDescription: 'Sigue la variaci�n de {from}/{to} a lo largo del tiempo.', historyPeriod: 'Per�odo del historial',
    days: '{n} d�as', months: '{n} meses', year: '1 a�o', years: '{n} a�os', pair: '{from} ? {to}', loadingHistory: 'Cargando tipos de cambio hist�ricos...',
    noHistory: 'No hay tipos de cambio disponibles para este per�odo.', receivedRecords: '{n} registros recibidos de la API', dateRange: 'Intervalo devuelto: {start} a {end}',
    latestInRange: 'Tipo m�s reciente del intervalo: {rate} {currency}', details: 'Datos detallados', startDate: 'Fecha inicial', endDate: 'Fecha final',
    minRate: 'Tipo m�nimo', maxRate: 'Tipo m�ximo', clearFilters: 'Borrar filtros', exportCsv: 'Exportar CSV ({n})',
    invalidDates: 'La fecha inicial debe ser anterior o igual a la fecha final.', invalidRates: 'El tipo m�nimo debe ser menor o igual al tipo m�ximo.',
    oneResult: 'resultado encontrado', manyResults: 'resultados encontrados', ofRecords: ' de {n} registros', noMatches: 'Ning�n registro coincide con los filtros.',
    date: 'Fecha', sourceCurrency: 'Moneda de origen', targetCurrency: 'Moneda de destino', rate: 'Tipo de cambio', sortBoth: 'Ordenar', sortAsc: 'Ordenar ascendente', sortDesc: 'Ordenar descendente',
    project: 'CONVERSOR DE DIVISAS', footer: 'Un proyecto de aprendizaje de React', csvDate: 'Fecha', csvFrom: 'Moneda de origen', csvTo: 'Moneda de destino', csvRate: 'Tipo de cambio', csvName: 'historial',
    rateError: 'No se pudo cargar el tipo de cambio. Inténtalo de nuevo.', historyError: 'No se pudo cargar el historial. Inténtalo de nuevo.',
    sameCurrencyHistory: 'Selecciona dos monedas diferentes para consultar el historial.', chartLabel: 'Gráfico histórico de {from} a {to}', filters: 'Filtros del historial',
    minPlaceholder: 'p. ej. 4,90', maxPlaceholder: 'p. ej. 5,20',
  },
}

Object.assign(translations['pt-BR'], {
  pageDescription: 'Aplica\u00e7\u00e3o para convers\u00e3o e an\u00e1lise de moedas.',
  currencyError: 'N\u00e3o foi poss\u00edvel carregar a lista de moedas. Tente novamente.',
  brand: 'c\u00e2mbio', heroDescription: 'Converta valores entre moedas e acompanhe as taxas de c\u00e2mbio em um s\u00f3 lugar.',
  makeConversion: 'Fa\u00e7a uma convers\u00e3o', loadingCurrencies: 'Carregando moedas dispon\u00edveis...',
  send: 'Voc\u00ea envia', receive: 'Voc\u00ea recebe', loadingRateButton: 'Consultando cota\u00e7\u00e3o...',
  waitRate: 'Aguarde uma cota\u00e7\u00e3o v\u00e1lida para realizar a convers\u00e3o.', conversionResult: 'Resultado da convers\u00e3o',
  currentRate: 'Consultando a cota\u00e7\u00e3o atual...', effectiveDate: 'Data efetiva da cota\u00e7\u00e3o: {date}',
  analysis: 'AN\u00c1LISE', historyTitle: 'Hist\u00f3rico de cota\u00e7\u00e3o',
  historyDescription: 'Acompanhe a varia\u00e7\u00e3o de {from}/{to} ao longo do tempo.', historyPeriod: 'Per\u00edodo do hist\u00f3rico',
  pair: '{from} \u2192 {to}', loadingHistory: 'Carregando cota\u00e7\u00f5es hist\u00f3ricas...',
  noHistory: 'N\u00e3o h\u00e1 cota\u00e7\u00f5es dispon\u00edveis para esse per\u00edodo.',
  latestInRange: 'Cota\u00e7\u00e3o mais recente no intervalo: {rate} {currency}',
  minRate: 'Cota\u00e7\u00e3o m\u00ednima', maxRate: 'Cota\u00e7\u00e3o m\u00e1xima',
  invalidDates: 'A data inicial deve ser anterior ou igual \u00e0 data final.',
  invalidRates: 'A cota\u00e7\u00e3o m\u00ednima deve ser menor ou igual \u00e0 cota\u00e7\u00e3o m\u00e1xima.',
  rate: 'Cota\u00e7\u00e3o', csvRate: 'Cota\u00e7\u00e3o',
  rateError: 'N\u00e3o foi poss\u00edvel carregar a cota\u00e7\u00e3o. Tente novamente.',
  historyError: 'N\u00e3o foi poss\u00edvel carregar o hist\u00f3rico. Tente novamente.',
  sameCurrencyHistory: 'Selecione duas moedas diferentes para consultar o hist\u00f3rico.',
  chartLabel: 'Gr\u00e1fico hist\u00f3rico de {from} para {to}',
})

Object.assign(translations.es, {
  pageDescription: 'Aplicaci\u00f3n para convertir y analizar monedas.',
  currencyError: 'No se pudo cargar la lista de monedas. Int\u00e9ntalo de nuevo.',
  makeConversion: 'Haz una conversi\u00f3n', send: 'Env\u00edas',
  loadingRateButton: 'Consultando el tipo de cambio...',
  waitRate: 'Espera un tipo de cambio v\u00e1lido para realizar la conversi\u00f3n.',
  conversionResult: 'Resultado de la conversi\u00f3n',
  effectiveDate: 'Fecha efectiva del tipo: {date}', analysis: 'AN\u00c1LISIS',
  historyDescription: 'Sigue la variaci\u00f3n de {from}/{to} a lo largo del tiempo.',
  historyPeriod: 'Per\u00edodo del historial', pair: '{from} \u2192 {to}',
  loadingHistory: 'Cargando tipos de cambio hist\u00f3ricos...',
  noHistory: 'No hay tipos de cambio disponibles para este per\u00edodo.',
  latestInRange: 'Tipo m\u00e1s reciente del intervalo: {rate} {currency}',
  minRate: 'Tipo m\u00ednimo', maxRate: 'Tipo m\u00e1ximo',
  rateError: 'No se pudo cargar el tipo de cambio. Int\u00e9ntalo de nuevo.',
  historyError: 'No se pudo cargar el historial. Int\u00e9ntalo de nuevo.',
  sameCurrencyHistory: 'Selecciona dos monedas diferentes para consultar el historial.',
  chartLabel: 'Gr\u00e1fico hist\u00f3rico de {from} a {to}',
})

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const savedLanguage = window.localStorage.getItem('conversor-language')

i18n.use(initReactI18next).init({
  resources: Object.fromEntries(Object.entries(translations).map(([language, translation]) => [language, { translation }])),
  lng: ['pt-BR', 'en', 'es'].includes(savedLanguage) ? savedLanguage : 'pt-BR',
  fallbackLng: 'pt-BR',
  supportedLngs: ['pt-BR', 'en', 'es'],
  interpolation: { escapeValue: false },
})

document.documentElement.lang = ['pt-BR', 'en', 'es'].includes(savedLanguage) ? savedLanguage : 'pt-BR'

i18n.on('languageChanged', (language) => {
  window.localStorage.setItem('conversor-language', language)
  document.documentElement.lang = language
})

export default i18n
