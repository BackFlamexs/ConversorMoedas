import styles from './Header.module.css'

function Header({ brandName, language, onLanguageChange, t }) {
  const options = [
    { code: 'pt-BR', flag: '\u{1F1E7}\u{1F1F7}', label: 'Portugu\u00eas (Brasil)' },
    { code: 'en', flag: '\u{1F1FA}\u{1F1F8}', label: 'English' },
    { code: 'es', flag: '\u{1F1EA}\u{1F1F8}', label: 'Espa\u00f1ol' },
  ]

  return (
    <header className={styles.topbar}>
      <a className={styles.brand} href="#inicio" aria-label={`${brandName}, ${t('home')}`}>
        <span className={styles.brandMark} aria-hidden="true">&#x2197;</span>
        <span>{brandName}<span className={styles.brandDot}>.</span></span>
      </a>
      <div className={styles.topbarActions}>
        <span className={styles.topbarLabel}>{t('converter')}</span>
        <div className={styles.languageSelector} role="group" aria-label={t('language')}>
          {options.map((item) => (
            <button
              key={item.code}
              className={styles.languageButton}
              type="button"
              aria-label={item.label}
              aria-pressed={language === item.code}
              title={item.label}
              onClick={() => onLanguageChange(item.code)}
            >{item.flag}</button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
