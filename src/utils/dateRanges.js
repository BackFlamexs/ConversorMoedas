const periods = {
  '7d': { days: 7 },
  '15d': { days: 15 },
  '30d': { days: 30 },
  '3m': { months: 3 },
  '6m': { months: 6 },
  '1y': { months: 12 },
  '5y': { months: 60 },
  '10y': { months: 120 },
}

function subtractMonths(date, months) {
  const firstDayOfTargetMonth = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth() - months,
    1,
  ))
  const lastDayOfTargetMonth = new Date(Date.UTC(
    firstDayOfTargetMonth.getUTCFullYear(),
    firstDayOfTargetMonth.getUTCMonth() + 1,
    0,
  )).getUTCDate()

  firstDayOfTargetMonth.setUTCDate(Math.min(date.getUTCDate(), lastDayOfTargetMonth))
  return firstDayOfTargetMonth
}

export function getDateRange(period, referenceDate = new Date()) {
  const periodConfig = periods[period]

  if (!periodConfig) {
    throw new Error(`Período histórico inválido: ${period}`)
  }

  const endDate = new Date(Date.UTC(
    referenceDate.getUTCFullYear(),
    referenceDate.getUTCMonth(),
    referenceDate.getUTCDate(),
  ))
  const startDate = periodConfig.days
    ? new Date(endDate)
    : subtractMonths(endDate, periodConfig.months)

  if (periodConfig.days) {
    startDate.setUTCDate(startDate.getUTCDate() - periodConfig.days + 1)
  }

  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
  }
}
