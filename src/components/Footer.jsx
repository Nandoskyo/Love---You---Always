export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-flower" aria-hidden="true">✿</div>
      <p className="footer-tagline">For You My Darling</p>
      <p className="footer-date">{year} · made with love</p>
    </footer>
  )
}
