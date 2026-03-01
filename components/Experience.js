export default function Experience() {
  const experiences = [
    {
      role: "Software Development Engineer 3",
      company: "Oracle Cloud Infrastructure (OCI)",
      period: "May 2024 – Present",
      description: [
        "Developed workflow orchestration systems decoupling design, orchestration and runtime execution layers",
        "Integrated observability using OCI Logging, Metrics, Monitoring, and alerting for production reliability",
        "Enhanced system reliability & consistency by reducing stuck & orphaned executions by over 90%",
        "Improved observability, automated validations, and performance across microservice developments"
      ],
      tech: ["Java 17", "Spring Boot", "JPA", "Kafka", "Redis", "Docker"]
    },
    {
      role: "Senior Software Engineer",
      company: "Paytm",
      period: "Sep 2020 – Mar 2024",
      description: [
        "Built Merchant Analytics platform from scratch, powering transactions and customer insights for merchants",
        "Refactored legacy systems, improving scalability, maintainability, and reducing operational costs by 40%",
        "Scaled Merchant Analytics to 100K+ merchants and process millions of daily transactions",
        "Integrated AWS CloudWatch and Lambda for observability, event automation, and system monitoring",
        "Built data ingestion pipelines using AWS S3 and Glue, enabling faster analytics processing"
      ],
      tech: ["Java 17", "Spring Boot", "Kafka", "MySQL", "AWS", "Docker"]
    },
    {
      role: "Software Engineer",
      company: "Cars24",
      period: "Jun 2018 – Jul 2020",
      description: [
        "Built and maintained microservices for Dealer Marketplace enabling real-time B2B car auctions",
        "Leveraged AWS EC2, ECS, and S3 for containerized deployments, backups, and distributed workflows",
        "Improved concurrency handling and reduced latency by 25% through efficient load distribution"
      ],
      tech: ["Java", "Spring Boot", "Kafka", "AWS", "WebSocket", "PostgreSQL"]
    }
  ]

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.role}</h3>
                  <span className="timeline-company">{exp.company}</span>
                  <span className="timeline-date">{exp.period}</span>
                </div>
                <ul className="timeline-description">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <div className="timeline-tech">
                  {exp.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
