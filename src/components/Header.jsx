function Header({ brandName }) {
  return (
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label={`${brandName}, início`}>
        <span className="brand-mark" aria-hidden="true">↗</span>
        <span>{brandName}<span className="brand-dot">.</span></span>
      </a>
      <span className="topbar-label">CONVERSOR DE MOEDAS</span>
    </header>
  )
}

export default Header
