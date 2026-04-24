import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data'
import { useScrollReveal } from '../hooks'

export default function ProjectPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const pageRef = useScrollReveal()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setCurrentSlide(0)
    setLoaded(false)
    requestAnimationFrame(() => setLoaded(true))
  }, [id])

  const goNext = useCallback(() => {
    if (project && currentSlide < project.images.length - 1) {
      setDirection(1)
      setCurrentSlide(prev => prev + 1)
    }
  }, [currentSlide, project])

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(prev => prev - 1)
    }
  }, [currentSlide])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        if (lightboxIndex !== null) {
          if (lightboxIndex < project.images.length - 1) setLightboxIndex(prev => prev + 1)
        } else {
          goNext()
        }
      }
      if (e.key === 'ArrowLeft') {
        if (lightboxIndex !== null) {
          if (lightboxIndex > 0) setLightboxIndex(prev => prev - 1)
        } else {
          goPrev()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, lightboxIndex, project])

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

  const slideVariants = {
    enter: (direction) => ({ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.95 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (direction) => ({ opacity: 0, x: direction < 0 ? 100 : -100, scale: 0.95 })
  }

  return (
    <div ref={pageRef} className={`project-page ${loaded ? 'loaded' : ''}`} style={{'--project-accent': project.color}}>
      {/* Hero */}
      <header className="project-hero">
        <div className="project-hero-bg" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="back-link">
              <motion.svg 
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                whileHover={{ x: -5 }}
              >
                <path d="M19 12H5m0 0l6 6m-6-6l6-6"/>
              </motion.svg>
              <span>Back</span>
            </Link>

            <div className="project-hero-content">
              <motion.h1 
                className="project-hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.title}
              </motion.h1>
              <motion.p 
                className="project-hero-tagline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {project.tagline}
              </motion.p>
              <motion.div 
                className="project-tags"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Image Slider */}
      <section className="project-gallery-section">
        <div className="container">
          <motion.div 
            className="image-slider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Main Image */}
            <div className="slider-main">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="slider-image-wrapper"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x < -50 || velocity.x < -500) goNext();
                    else if (offset.x > 50 || velocity.x > 500) goPrev();
                  }}
                >
                  <img
                    src={project.images[currentSlide].src}
                    alt={`${project.title} - ${currentSlide + 1}`}
                    onClick={() => setLightboxIndex(currentSlide)}
                    style={{ cursor: 'zoom-in', pointerEvents: 'auto' }}
                    draggable="false"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <button 
                    className={`slider-arrow slider-arrow-left ${currentSlide === 0 ? 'disabled' : ''}`}
                    onClick={goPrev}
                    disabled={currentSlide === 0}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button 
                    className={`slider-arrow slider-arrow-right ${currentSlide === project.images.length - 1 ? 'disabled' : ''}`}
                    onClick={goNext}
                    disabled={currentSlide === project.images.length - 1}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </>
              )}

              {/* Slide Counter */}
              <div className="slider-counter">
                <span className="slider-current">{currentSlide + 1}</span>
                <span className="slider-separator">/</span>
                <span className="slider-total">{project.images.length}</span>
              </div>
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="slider-thumbnails">
                {project.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    className={`slider-thumb ${idx === currentSlide ? 'active' : ''}`}
                    onClick={() => {
                      setDirection(idx > currentSlide ? 1 : -1)
                      setCurrentSlide(idx)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img.src} alt={`Thumb ${idx + 1}`} />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="project-nav">
        <div className="container">
          <div className="project-nav-simple">
            {prevProject ? (
              <Link to={`/project/${prevProject.id}`} className="nav-simple-link">
                <span className="nav-simple-arrow">←</span>
                <span className="nav-simple-title">{prevProject.title}</span>
              </Link>
            ) : <span />}
            {nextProject ? (
              <Link to={`/project/${nextProject.id}`} className="nav-simple-link">
                <span className="nav-simple-title">{nextProject.title}</span>
                <span className="nav-simple-arrow">→</span>
              </Link>
            ) : <span />}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            className="lightbox-overlay" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.button 
              className="lightbox-close"
              whileHover={{ rotate: 90, scale: 1.1 }}
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </motion.button>
            
            {lightboxIndex > 0 && (
              <motion.button 
                className="lightbox-arrow lightbox-arrow-left"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => prev - 1); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </motion.button>
            )}

            <motion.img 
              key={lightboxIndex}
              src={project.images[lightboxIndex].src} 
              alt="Full view" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -50 || velocity.x < -500) {
                  if (lightboxIndex < project.images.length - 1) setLightboxIndex(prev => prev + 1);
                } else if (offset.x > 50 || velocity.x > 500) {
                  if (lightboxIndex > 0) setLightboxIndex(prev => prev - 1);
                }
              }}
            />

            {lightboxIndex < project.images.length - 1 && (
              <motion.button 
                className="lightbox-arrow lightbox-arrow-right"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => prev + 1); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}