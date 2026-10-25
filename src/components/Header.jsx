import styles from './Header.module.css'

function Header({ brandName }) {
  return (
    <header className={styles.topbar}>
      <a className={styles.brand} href="#inicio" aria-label={`${brandName}, início`}>
        <span className={styles.brandMark} aria-hidden="true">↗</span>
        <span>{brandName}<span className={styles.brandDot}>.</span></span>
      </a>
      <span className={styles.topbarLabel}>CONVERSOR DE MOEDAS</span>
    </header>
  )
}

export default Header
