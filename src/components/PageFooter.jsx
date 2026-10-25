import styles from './PageFooter.module.css'

function PageFooter({ projectName, description }) {
  return (
    <footer className={styles.pageFooter}>
      <span>{projectName}</span>
      <span>{description}</span>
    </footer>
  )
}

export default PageFooter
