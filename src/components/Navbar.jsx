import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-logo">
          Portfolio
        </Link>
        <div className="navbar-links">
          {isHome ? (
            <>
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="mailto:priyankar2322@gmail.com">Contact</a>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/#work">Work</Link>
              <a href="mailto:priyankar2322@gmail.com">Contact</a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
