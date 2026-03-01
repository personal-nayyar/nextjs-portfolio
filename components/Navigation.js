import { useState } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">MN</span>
        </div>
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a>
          </li>
          <li className="nav-item">
            <a href="#experience" className="nav-link" onClick={closeMobileMenu}>Experience</a>
          </li>
          <li className="nav-item">
            <a href="#skills" className="nav-link" onClick={closeMobileMenu}>Skills</a>
          </li>
          <li className="nav-item">
            <a href="#projects" className="nav-link" onClick={closeMobileMenu}>Projects</a>
          </li>
          <li className="nav-item">
            <a href="#education" className="nav-link" onClick={closeMobileMenu}>Education</a>
          </li>
          <li className="nav-item">
            <a href="#certifications" className="nav-link" onClick={closeMobileMenu}>Certifications</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
          </li>
        </ul>
        <div className="nav-toggle" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}
