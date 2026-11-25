import { HeroBackground } from './HeroBackground'

export function Hero({ profile }) {
  return (
    <section id="top" className="hero">
      <HeroBackground />
      <div className="container hero__content">
        <div className="hero__inner">
          <span className="badge">{profile.availability}</span>
          <h1 className="hero__title">
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>.
            <br />
            {profile.role}
          </h1>
          <p className="hero__subtitle">{profile.tagline}</p>

          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn--secondary">
              Get in Touch
            </a>
          </div>

          <ul className="hero__socials" aria-label="Social links">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
