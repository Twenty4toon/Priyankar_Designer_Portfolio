import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data'
import { useScrollReveal, useStagger } from '../hooks'
import PhoneGirlAnimation from '../components/PhoneGirlAnimation'

const skills = [
  "Package Design", "Illustration", "Brand Identity", "Adobe Illustrator",
  "Adobe Photoshop", "Mockup Design", "Print Design", "Typography"
]

export default function HomePage() {
  const pageRef = useScrollReveal()
  const staggerRef = useStagger(100)

  const thumbnailProjects = projects.filter(p => 
    p.id === 'acharya-guru' || 
    p.id === 'mirakle-coq10' || 
    p.id === 'mirakle-mito'
  )

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 80,
        y: (e.clientY / window.innerHeight - 0.5) * 80
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={pageRef} style={{ backgroundColor: 'transparent' }}>
      {/* ── Interactive Motion Background ── */}
      <div className="interactive-bg">
        <motion.div 
          className="bg-orb bg-orb-1"
          animate={{ x: mousePos.x * 1.2, y: mousePos.y * 1.2 }}
          transition={{ type: "spring", stiffness: 60, damping: 25 }}
        />
        <motion.div 
          className="bg-orb bg-orb-2"
          animate={{ x: -mousePos.x * 2, y: -mousePos.y * 1.5 }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div 
          className="bg-orb bg-orb-3"
          animate={{ x: mousePos.x * 1.5, y: -mousePos.y * 1.2 }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
        />
        
        {/* Floating White Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="gold-particle"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.4
            }}
            animate={{ 
              x: mousePos.x * (i % 5 + 1) * 8, 
              y: mousePos.y * (i % 4 + 1) * 8,
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 3, 
              repeat: Infinity,
              type: "spring",
              stiffness: 20
            }}
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
              pointerEvents: 'none',
              zIndex: -1
            }}
          />
        ))}
      </div>

      {/* ── Hero ── */}
      <header className="hero">
        <div className="container hero-layout">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 className="hero-title">
              <span className="hero-title-line" style={{ fontSize: '0.38em', marginBottom: '0.5em', color: 'var(--text-tertiary)' }}>
                <motion.span 
                  className="hero-title-word" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Priyanka R
                </motion.span>
              </span>
              <span className="hero-title-line">
                <motion.span 
                  className="hero-title-word"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Graphic
                </motion.span>
              </span>
              <span className="hero-title-line">
                <motion.span 
                  className="hero-title-word"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Designer
                </motion.span>
                <motion.span 
                  className="hero-title-word accent" 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  &
                </motion.span>
              </span>
              <span className="hero-title-line">
                <motion.span 
                  className="hero-title-word gradient-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                >
                  Illustrator
                </motion.span>
              </span>
            </motion.h1>
            <motion.p 
              className="hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              A freelance graphic designer with over three years of experience — specializing in illustrative art, premium packaging, and visual identity systems.
            </motion.p>
            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/projects">
                <motion.button
                  className="btn-primary"
                  style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                </motion.button>
              </Link>
              <motion.a
                href="mailto:priyankar2322@gmail.com"
                className="btn-outline"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <PhoneGirlAnimation />
          </motion.div>
        </div>
      </header>

      {/* ── Projects ── */}
      <section id="work" className="section">
        <div className="container">
          <motion.div 
            className="section-header reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">My Portfolio</h2>
            <p className="section-desc">Click on a project to explore</p>
          </motion.div>

          <div className="projects-list-home" ref={staggerRef}>
            {thumbnailProjects.map((project, index) => {
              const isRight = index % 2 === 1
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/project/${project.id}`} className="project-card-link">
                    <motion.div
                      className={`project-card-home ${isRight ? 'image-right' : ''}`}
                      whileHover={{ y: -8, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div 
                        className="project-card-preview"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                      >
                        <img src={project.thumbnail} alt={project.title} />
                      </motion.div>
                      <motion.div className="project-card-left">

                        <motion.h3 
                          className="project-card-title"
                          whileHover={{ color: 'var(--accent)' }}
                          transition={{ duration: 0.3 }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p className="project-card-tagline">
                          {project.tagline}
                        </motion.p>
                        <motion.div className="project-tags">
                          {project.tags.map((tag, i) => (
                            <motion.span 
                              key={tag} 
                              className="tag"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>
                        <motion.span className="view-label">
                          View Project
                          <motion.svg 
                            width="16" height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                          >
                            <path d="M5 12h14m0 0l-5-5m5 5l-5 5"/>
                          </motion.svg>
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
          <motion.div 
            style={{ textAlign: 'center', marginTop: '4rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/projects" className="btn-primary" style={{ padding: '1rem 3rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
              View All Projects
              <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14m0 0l-7-7m7 7l-7 7"/>
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section section-alt">
        <div className="container">
          <motion.div 
            className="section-header reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="section-label">About</span>
            <h2 className="section-title">The Designer</h2>
          </motion.div>
          <div className="about-layout">
            <motion.div 
              className="about-text reveal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p>
                I'm Priyanka R — a freelance graphic designer with over three years of experience in illustrative art and high-impact packaging design.
              </p>
              <motion.div className="skill-list">
                {skills.map((skill, i) => (
                  <motion.span 
                    key={skill} 
                    className="skill-pill"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3, borderColor: 'var(--accent)' }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="stats-column reveal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { num: '3+', label: 'Years' },
                { num: '50+', label: 'Projects' },
                { num: '30+', label: 'Clients' }
              ].map(stat => (
                <motion.div 
                  key={stat.label}
                  className="stat-card"
                  whileHover={{ y: -5, borderColor: 'var(--accent)' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="stat-number gradient-text"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {stat.num}
                  </motion.div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="footer">
        <div className="container">
          <motion.div 
            className="footer-cta reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-cta-title">Let's create something remarkable.</h3>
            <p className="footer-cta-desc">Have a project in mind?</p>
            <motion.a 
              href="mailto:priyankar2322@gmail.com" 
              className="btn-primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
          <div className="footer-bottom">
            <span className="footer-copy">Designed and Developed by Priyanka R</span>
          </div>
        </div>
      </footer>
    </div>
  )
}