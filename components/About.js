export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Professional software developer with around 7 years of experience in designing, developing, and optimizing scalable distributed systems. Specialized in Java ecosystem, microservices architecture, and cloud-native applications with a proven track record of building high-performance systems.
            </p>
            
            {/* Expertise Section */}
            <div className="expertise-section">
              <h3>Areas of Expertise</h3>
              <div className="expertise-grid">
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <i className="fas fa-network-wired"></i>
                  </div>
                  <div className="expertise-content">
                    <h4>Distributed Systems</h4>
                    <p>Designing and scaling microservices architectures that handle millions of requests securely.</p>
                  </div>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <i className="fas fa-server"></i>
                  </div>
                  <div className="expertise-content">
                    <h4>Backend Engineering</h4>
                    <p>Deep expertise in Java ecosystem, Spring Boot, and high-performance concurrent processing.</p>
                  </div>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <i className="fas fa-cloud"></i>
                  </div>
                  <div className="expertise-content">
                    <h4>Cloud Infrastructure</h4>
                    <p>Deploying and managing robust infrastructure on AWS and Oracle Cloud Infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
