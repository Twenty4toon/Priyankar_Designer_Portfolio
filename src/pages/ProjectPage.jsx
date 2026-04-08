import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { projects } from '../data'
import { useScrollReveal, useStagger } from '../hooks'

export default function ProjectPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const pageRef = useScrollReveal()
  const galleryRef = useStagger(50)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => setLoaded(true))
  }, [id])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!project) {
    return (
      <div className="not-found">
        <h1>Project not found</h1>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    )
  }

  const currentIdx = projects.findIndex(p => p.id === id)
  const prevProject = projects[currentIdx - 1] || null
  const nextProject = projects[currentIdx + 1] || null

  return (
    <div ref={pageRef} className={`project-page ${loaded ? 'loaded' : ''}`} style={{'--project-accent': project.color}}>
      {/* Hero */}
      <header className="project-hero">
        <div className="project-hero-bg" />
        <div className="container">
          <Link to="/" className="back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m0 0l6 6m-6-6l6-6"/></svg>
            <span>Back to Portfolio</span>
          </Link>

          <div className="project-hero-content">
            <span className="project-hero-number">Project {project.number}</span>
            <h1 className="project-hero-title">{project.title}</h1>
            <p className="project-hero-tagline">{project.tagline}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section className="project-gallery-section">
        <div className="container">
          <div className="gallery-grid cols-2" ref={galleryRef}>
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className={`gallery-item stagger-child ${img.span}`}
                onClick={() => setLightboxImg(img.src)}
              >
                <img
                  src={img.src}
                  alt={`${project.title} - Image ${idx + 1}`}
                  loading={idx < 2 ? "eager" : "lazy"}
                />
                <div className="gallery-item-overlay">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6m-3-3h6"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="project-nav">
        <div className="container">
          <div className="project-nav-grid">
            {prevProject ? (
              <Link to={`/project/${prevProject.id}`} className="project-nav-link prev">
                <span className="project-nav-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m0 0l6 6m-6-6l6-6"/></svg>
                  Previous
                </span>
                <span className="project-nav-title">{prevProject.title}</span>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link to={`/project/${nextProject.id}`} className="project-nav-link next">
                <span className="project-nav-label">
                  Next
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                </span>
                <span className="project-nav-title">{nextProject.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
          <img src={lightboxImg} alt="Full view" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
