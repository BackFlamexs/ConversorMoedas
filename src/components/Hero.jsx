function Hero({ eyebrow, titleStart, titleHighlight, description }) {
  return (
    <section className="hero" id="inicio" aria-labelledby="page-title">
      <p className="eyebrow"><span className="status-dot" /> {eyebrow}</p>
      <h1 id="page-title">
        {titleStart}<br />
        <span>{titleHighlight}</span>
      </h1>
      <p className="hero-description">{description}</p>
    </section>
  )
}

export default Hero
