import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data'
import { useScrollReveal, useCursorGlow, useStagger } from '../hooks'

const skills = [
  "Package Design", "Illustration", "Brand Identity", "Adobe Illustrator",
  "Adobe Photoshop", "Mockup Design", "Print Design", "Label Design",
  "Typography", "Color Theory"
]

export default function HomePage() {
  const pageRef = useScrollReveal()
  const cursorRef = useCursorGlow()
  const staggerRef = useStagger(120)

  return (
    <div ref={pageRef}>
      <div ref={cursorRef} className="cursor-glow" />

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-bg">
          <div className="hero-grain" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              <span className="hero-title-line" style={{ fontSize: '0.4em', marginBottom: '0.5em', color: 'var(--text-secondary)' }}>
                <span className="hero-title-word">Priyanka R</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-word">Graphic</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-word">Designer</span>
                <span className="hero-title-word accent">&</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-word gradient-text">Illustrator</span>
              </span>
            </h1>
            <p className="hero-desc">
              A freelance graphic designer with over three years of professional experience — specializing in illustrative art, premium packaging, and visual identity systems that help brands stand out.
            </p>
            <div className="hero-actions">
              <motion.a 
                href="#work" 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>View Projects</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14m0 0l-5-5m5 5l-5-5"/></svg>
              </motion.a>
              <motion.a 
                href="mailto:priyankar2322@gmail.com" 
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Get in touch →</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Projects ── */}
      <section id="work" className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">Package Design Portfolio</h2>
            <p className="section-desc">
              Click on a project to explore the full case study and design assets.
            </p>
          </div>

          <div className="projects-list" ref={staggerRef}>
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="project-card-link stagger-child"
              >
                <motion.div 
                  className="project-card-home" 
                  style={{'--project-accent': project.color}}
                  whileHover={{ scale: 1.015, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  layoutId={`project-container-${project.id}`}
                >
                  <div className="project-card-left">
                    <span className="project-number">Project {project.number}</span>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-tagline">{project.tagline}</p>
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <span className="view-label">
                      View Project
                      <motion.svg 
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <path d="M5 12h14m0 0l-5-5m5 5l-5 5"/>
                      </motion.svg>
                    </span>
                  </div>
                  <div className="project-card-preview">
                    <motion.img 
                      src={project.thumbnail} 
                      alt={project.title}
                      layoutId={`project-image-${project.id}`}
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section section-alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">About</span>
            <h2 className="section-title">The Designer Behind the Work</h2>
          </div>
          <div className="about-layout">
            <div className="about-text reveal">
              <p>
                I'm Priyanka R — a freelance graphic designer with over three years of hands-on experience in the design industry. I specialize in illustrative art and high-impact packaging that helps brands tell their story visually.
              </p>
              <p>
                My process spans from concept sketches to production-ready artwork, covering every stage of the design lifecycle. I believe great packaging goes beyond aesthetics — it communicates value, builds recognition, and drives sales.
              </p>
              <div className="skill-list">
                {skills.map(skill => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
            <div className="stats-column reveal">
              <div className="stat-card">
                <div className="stat-number gradient-text">3+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number gradient-text">50+</div>
                <div className="stat-label">Projects Done</div>
              </div>
              <div className="stat-card">
                <div className="stat-number gradient-text">30+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-cta reveal">
            <h3 className="footer-cta-title">Let's create something remarkable.</h3>
            <p className="footer-cta-desc">Have a project in mind? I'd love to hear about it.</p>
            <a href="mailto:priyankar2322@gmail.com" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Get in Touch</span>
            </a>
          </div>
          <div className="footer-bottom" style={{ justifyContent: 'center' }}>
            <span className="footer-copy">© {new Date().getFullYear()} Priyanka R. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
