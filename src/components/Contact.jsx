export function Contact({ email, phone, location }) {
  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <div className="contact__inner">
          <p className="section__eyebrow">Contact</p>
          <h2 className="section__title">Let&apos;s build something together</h2>
          <p className="contact__copy">
            Have a project or role in mind? Reach out directly via email or phone.
          </p>

          <ul className="contact__details">
            <li>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${email}`} className="text-link">
                {email}
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{' '}
              <a href={`tel:${phone}`} className="text-link">
                {phone}
              </a>
            </li>
            <li>
              <strong>Location:</strong> {location}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
