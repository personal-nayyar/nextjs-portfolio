export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Hi, I'm Mohd Nayyar</h1>
          <h2 className="hero-subtitle">Software Development Engineer 3</h2>
          <p className="hero-description">
            Results-driven Senior Software Engineer with 7+ years of experience designing, developing, and optimizing software components using Java, Spring Boot, React and Microservices architecture.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a href="#experience" className="btn btn-outline">View Experience</a>
            <a href="https://drive.google.com/file/d/1Xj__gyp5Nmu9188pwpMbWHv_1radiBwg/view?usp=sharing" className="btn btn-cv" download>
              <i className="fas fa-download"></i> Download CV
            </a>
          </div>
          <div className="hero-social">
            <a href="mailto:personal.nayyar@gmail.com" className="social-link">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://linkedin.com/in/mohd-nayyar" className="social-link" target="_blank">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="tel:+919045313239" className="social-link">
              <i className="fas fa-phone"></i>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="profile-info">
              <h3>Mohd Nayyar</h3>
              <p>Software Development Engineer 3</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
