export function Experience({ experience, education }) {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Career &amp; Education</p>
          <h2 className="section__title">Work Experience</h2>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article key={item.id} className="card timeline__item">
              <div className="timeline__top">
                <div>
                  <h3 className="card__title">
                    {item.role} · <span className="gradient-text">{item.company}</span>
                  </h3>
                  {item.location && <p className="timeline__location">{item.location}</p>}
                </div>
                <span className="badge badge--inline">{item.period}</span>
              </div>

              <ul className="bullet-list">
                {item.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="education-block">
          <h3 className="education-block__heading">Education</h3>
          <div className="timeline">
            {education.map((edu) => (
              <article key={edu.degree} className="card timeline__item">
                <div className="timeline__top">
                  <div>
                    <h4 className="card__title">{edu.degree}</h4>
                    <p className="timeline__location">{edu.institution}</p>
                  </div>
                  <span className="badge badge--inline">{edu.period}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
