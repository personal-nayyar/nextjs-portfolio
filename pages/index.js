import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import ChatBot from '../components/ChatBot'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
      <ChatBot />
      <Footer />
    </div>
  )
}
