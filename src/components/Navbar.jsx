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

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-logo">
          Portfolio
        </Link>
        <div className="navbar-links">
          {isHome ? (
            <>
              <button 
                onClick={(e) => handleScroll(e, 'work')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', inherit: 'font', fontFamily: 'inherit', padding: 0, color: 'inherit' }}
                className="nav-btn"
              >Work</button>
              <button 
                onClick={(e) => handleScroll(e, 'about')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', inherit: 'font', fontFamily: 'inherit', padding: 0, color: 'inherit' }}
                className="nav-btn"
              >About</button>
              <a href="mailto:priyankar2322@gmail.com">Contact</a>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/">Work</Link>
              <a href="mailto:priyankar2322@gmail.com">Contact</a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
