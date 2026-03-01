export default function Skills() {
  const skillsData = {
    languages: ["Java 17+", "Python"],
    frameworks: ["Spring Boot", "JPA/Hibernate", "JUnit/Mockito", "React"],
    architecture: ["Microservices", "REST APIs", "System Design"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    bigData: ["Apache Kafka", "Apache Spark", "Elasticsearch"],
    devOps: ["AWS", "CI/CD Pipelines", "Jenkins", "Docker", "Kubernetes"]
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Core Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3><i className="fas fa-code"></i> Programming Languages</h3>
            <div className="skill-list">
              {skillsData.languages.map((skill, i) => (
                <span key={i} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3><i className="fas fa-layer-group"></i> Frameworks & Libraries</h3>
            <div className="skill-list">
              {skillsData.frameworks.map((skill, i) => (
                <span key={i} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3><i className="fas fa-sitemap"></i> Architecture & Design</h3>
            <div className="skill-list">
              {skillsData.architecture.map((skill, i) => (
                <span key={i} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3><i className="fas fa-database"></i> Databases & Caching</h3>
            <div className="skill-list">
              {skillsData.databases.map((skill, i) => (
                <span key={i} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3><i className="fas fa-stream"></i> Big Data & Streaming</h3>
            <div className="skill-list">
              {skillsData.bigData.map((skill, i) => (
                <span key={i} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3><i className="fas fa-cloud"></i> DevOps & Cloud</h3>
            <div className="skill-list">
              {skillsData.devOps.map((skill, i) => (
                <span key={i} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
