const CURRENT_YEAR = new Date().getFullYear()

export function Footer({ name }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {CURRENT_YEAR} {name}
        </p>

        <div className="footer__back-to-top">
          <p>Back to top</p>

          <a
            href="#top"
            className="icon-btn footer__top-btn"
            aria-label="Back to top"
            title="Back to top"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
