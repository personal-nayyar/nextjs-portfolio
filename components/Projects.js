export default function Projects() {
  const projects = [
    {
      name: "Intelligence Data Lake",
      company: "Oracle",
      description: [
        "<strong>Built</strong> workflow orchestration system supporting multiple pipelines with decoupled orchestration & execution",
        "<strong>Enabled</strong> workload delegations to multiple execution engines for scalable ETL processing",
        "<strong>Enhanced</strong> orchestration workflows with metadata-driven automation improving query performance by 30%",
        "<strong>Implemented</strong> observability metrics, automated validation, and improved data integrity checks",
        "90% reduction in stuck executions",
        "30% query performance improvement",
        "Metadata-driven automation"
      ],
      tech: ["Java 17", "Spring Boot", "Kafka", "Python"]
    },
    {
      name: "Merchant Analytics",
      company: "Paytm",
      description: [
        "<strong>Built</strong> a real-time analytics system for transaction and merchant insights using Kafka and PostgreSQL",
        "<strong>Designed</strong> APIs for dashboard insights and integrated caching for sub-second analytics responses",
        "<strong>Improved</strong> analytics performance by ~3–5× and reduced costs by ~40%",
        "<strong>Enabled</strong> continuous performance monitoring and optimized backpressure handling",
        "100K+ merchants served",
        "3-5x performance improvement",
        "40% cost reduction"
      ],
      tech: ["Java 17", "Spring Boot", "Kafka", "PostgreSQL", "React"]
    },
    {
      name: "Dealer Marketplace",
      company: "Cars24",
      description: [
        "<strong>Developed</strong> real-time B2B car auction microservices using WebSockets and Redis caching",
        "<strong>Improved</strong> concurrency handling and reduced latency by 25% through efficient load distribution",
        "<strong>Designed</strong> modular, fault-tolerant microservices for inventory, bidding, and transactions",
        "25% latency reduction",
        "Real-time B2B auctions",
        "Fault-tolerant architecture"
      ],
      tech: ["Java", "Spring Boot", "WebSocket", "Redis", "PostgreSQL"]
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Project Highlights</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className="project-company">{project.company}</span>
              </div>
              <div className="project-description">
                <ul>
                  {project.description.map((desc, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: desc }} />
                  ))}
                </ul>
              </div>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
