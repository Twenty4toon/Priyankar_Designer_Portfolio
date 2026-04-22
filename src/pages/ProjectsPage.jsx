import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data'
import { useScrollReveal, useStagger } from '../hooks'
import { useEffect } from 'react'

export default function ProjectsPage() {
  const { revealRef, isVisible } = useScrollReveal()
  const { parentRef, childClass } = useStagger(isVisible)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="projects-page-container" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className="container">
        <header className="section-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            All <span className="gradient-text">Portfolio</span>
          </motion.h1>
          <p className="section-desc">A curated collection of my creative work.</p>
        </header>

        <div className="projects-list" ref={parentRef}>
          {projects.map((project, index) => {
            const isRight = index % 2 === 1;
            return (
              <motion.div 
                key={project.id} 
                className={`project-card-home ${isRight ? 'image-right' : ''} ${childClass}`}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link to={`/project/${project.id}`} className="project-card-link" style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'inherit' }}>
                  <div className="project-card-preview">
                    <img src={project.thumbnail} alt={project.title} loading="lazy" />
                  </div>
                  <div className="project-card-left">
                    <span className="project-number">{project.number}</span>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-tagline">{project.tagline}</p>
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <span className="view-label">
                      View Project
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '5px' }}>
                        <path d="M5 12h14m0 0l-5-5m5 5l-5 5"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
