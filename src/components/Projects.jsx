import { useState } from 'react'

export function Projects({ projects }) {
  const categories = ['All', ...new Set(projects.map((p) => p.category))]
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section__header section__header--row">
          <div>
            <p className="section__eyebrow">Personal Projects</p>
            <h2 className="section__title">Deployed Work</h2>
          </div>

          <div className="filter-group" role="tablist" aria-label="Filter projects by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`filter-btn ${activeCategory === category ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects__grid">
          {visibleProjects.map((project) => (
            <article key={project.id} className="card project-card">
              <div className="project-card__meta">
                <span className="project-card__category">{project.category}</span>
                {project.period && <span className="project-card__period">{project.period}</span>}
              </div>
              <h3 className="card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <ul className="tag-list">
                {project.stack.map((tech) => (
                  <li key={tech} className="tag tag--subtle">
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="project-card__links">
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link">
                  Live Demo ↗
                </a>
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-link">
                  GitHub ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
