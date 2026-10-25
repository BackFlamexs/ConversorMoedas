import styles from './Hero.module.css'

function Hero({ eyebrow, titleStart, titleHighlight, description }) {
  return (
    <section className={styles.hero} id="inicio" aria-labelledby="page-title">
      <p className={styles.eyebrow}><span className={styles.statusDot} /> {eyebrow}</p>
      <h1 id="page-title" className={styles.title}>
        {titleStart}<br />
        <span className={styles.titleHighlight}>{titleHighlight}</span>
      </h1>
      <p className={styles.description}>{description}</p>
    </section>
  )
}

export default Hero
