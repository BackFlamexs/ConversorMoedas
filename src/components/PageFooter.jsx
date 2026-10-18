function PageFooter({ projectName, description }) {
  return (
    <footer className="page-footer">
      <span>{projectName}</span>
      <span>{description}</span>
    </footer>
  )
}

export default PageFooter
