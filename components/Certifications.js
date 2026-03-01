export default function Certifications() {
  const certifications = [
    {
      title: "Oracle Certified Professional",
      subtitle: "Java SE 17 Developer"
    },
    {
      title: "AWS Certified Developer",
      subtitle: "Associate"
    },
    {
      title: "Oracle Cloud Infrastructure",
      subtitle: "Developer Professional (1Z0-1084-23)"
    }
  ]

  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-card">
              <i className="fas fa-certificate"></i>
              <h3>{cert.title}</h3>
              <p>{cert.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
