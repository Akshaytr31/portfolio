import { useEffect, useState } from 'react'
import { ABOUT, EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS } from './data/portfolio'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app-shell">
      <Navbar name={PROFILE.name} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero profile={PROFILE} />
        <About about={ABOUT} skills={SKILLS} />
        <Experience experience={EXPERIENCE} education={EDUCATION} />
        <Projects projects={PROJECTS} />
        <Contact email={PROFILE.email} phone={PROFILE.phone} location={PROFILE.location} />
      </main>
      <Footer name={PROFILE.name} />
    </div>
  )
}
