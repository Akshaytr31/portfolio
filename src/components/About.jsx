export function About({ about, skills }) {
  return (
    <>
      <section id="about" className="section section--alt">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow">About</p>
            <h2 className="section__title">Engineering with clarity and craft</h2>
          </div>

          <div className="about__grid">
            <div className="about__left">
              <p className="about__summary">{about.summary}</p>

              <div className="about__extras">
                <div className="card">
                  <h3 className="card__title">Languages</h3>
                  <ul className="meta-list">
                    {about.languages.map((lang) => (
                      <li key={lang.name}>
                        <strong>{lang.name}</strong> — {lang.level}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card">
                  <h3 className="card__title">Interests</h3>
                  <ul className="tag-list">
                    {about.interests.map((interest) => (
                      <li key={interest} className="tag">
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="about__stats">
              {about.highlights.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-card__value">{stat.value}</span>
                  <span className="stat-card__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow">Capabilities</p>
            <h2 className="section__title">Skills &amp; Technologies</h2>
          </div>

          <div className="skills__grid">
            {skills.map((group) => (
              <article key={group.category} className="card">
                <h3 className="card__title">{group.category}</h3>
                <ul className="tag-list">
                  {group.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
