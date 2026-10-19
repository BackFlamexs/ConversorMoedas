const API_BASE_URL = 'https://api.frankfurter.dev/v2'

export async function getCurrencies() {
  const response = await fetch(`${API_BASE_URL}/currencies`)

  if (!response.ok) {
    throw new Error(`Não foi possível carregar as moedas (HTTP ${response.status}).`)
  }

  const data = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('A resposta da API de moedas está em um formato inesperado.')
  }

  return data
    .filter((currency) => currency.iso_code && currency.name)
    .map((currency) => ({ code: currency.iso_code, name: currency.name }))
    .sort((firstCurrency, secondCurrency) => firstCurrency.code.localeCompare(secondCurrency.code))
}

export async function getLatestRate(baseCurrency, quoteCurrency) {
  const response = await fetch(
    `${API_BASE_URL}/rate/${baseCurrency.toLowerCase()}/${quoteCurrency.toLowerCase()}`,
  )

  if (!response.ok) {
    throw new Error(`Não foi possível carregar a cotação (HTTP ${response.status}).`)
  }

  const data = await response.json()

  if (typeof data.rate !== 'number' || !data.date) {
    throw new Error('A resposta da cotação está em um formato inesperado.')
  }

  return data
}
