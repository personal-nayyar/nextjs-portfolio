import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'

export default function Layout({ children }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isInitialized = useRef(false)

  useEffect(() => {
    // Only initialize once
    if (isInitialized.current) return
    isInitialized.current = true

    // Initialize navigation state - set Home as active by default
    const initializeNavigation = () => {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active')
      })
      const homeLink = document.querySelector('a[href="#home"]')
      if (homeLink) {
        homeLink.classList.add('active')
      }
    }

    // Scroll to top on page load/refresh
    window.scrollTo(0, 0)
    initializeNavigation()

    // Smooth scrolling for navigation links
    const handleNavClick = function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      
      setIsNavigating(true)
      
      // Immediately set active state for clicked link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active')
      })
      this.classList.add('active')
      
      // Use browser's native smooth scrolling
      const target = document.querySelector(targetId)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
      
      // Clear navigation flag after animation completes
      setTimeout(() => {
        setIsNavigating(false)
      }, 800)
    }

    // Add event listeners to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleNavClick)
    })

    // Add active state to navigation based on scroll position
    const handleScroll = () => {
      if (isNavigating) return
      
      let current = ''
      const sections = document.querySelectorAll('section')
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      // Special case for home section
      if (scrollTop < 200) {
        current = 'home'
      } else {
        sections.forEach(section => {
          const sectionTop = section.offsetTop
          if (scrollTop >= (sectionTop - 200)) {
            current = section.getAttribute('id')
          }
        })
      }

      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleNavClick)
      })
    }
  }, [isNavigating])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <Head>
        <title>Mohd Nayyar - Software Development Engineer 3</title>
        <meta name="description" content="Results-driven Senior Software Engineer with 7+ years of experience designing, developing, and optimizing software components using Java, Spring Boot, React and Microservices architecture." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="app">
        {children}
      </div>
    </>
  )
}
