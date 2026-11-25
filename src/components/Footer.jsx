const CURRENT_YEAR = new Date().getFullYear()

export function Footer({ name }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {CURRENT_YEAR} {name}. Built with React &amp; Vite.
        </p>
        <a href="#top" className="text-link">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
