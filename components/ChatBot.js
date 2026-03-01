import { useState, useEffect, useRef } from 'react'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hello! I'm Mohd Nayyar's AI assistant. I can help you with questions about his skills, experience, projects, and background. How can I assist you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const chatContainerRef = useRef(null)

  const portfolioData = {
    name: "Mohd Nayyar",
    title: "Software Development Engineer 3",
    experience: "7+ years",
    email: "personal.nayyar@gmail.com",
    phone: "+91 9045313239",
    location: "Noida, India",
    linkedin: "linkedin.com/in/mohd-nayyar",
    github: "github.com/personal-nayyar",
    education: {
      degree: "Master of Computer Applications (MCA)",
      school: "National Institute of Technology, Karnataka",
      period: "2015 – 2018",
      cgpa: "8.0/10"
    },
    skills: {
      languages: ["Java 17+", "Python"],
      frameworks: ["Spring Boot", "JPA/Hibernate", "JUnit/Mockito", "React"],
      databases: ["MySQL", "PostgreSQL", "Redis", "MongoDB"],
      cloud: ["AWS", "OCI", "Docker", "Kubernetes"],
      tools: ["Git", "Maven", "Jenkins", "Kafka"]
    },
    experience: [
      {
        company: "Oracle Cloud Infrastructure (OCI)",
        role: "Software Development Engineer 3",
        period: "May 2024 – Present",
        description: "Developed workflow orchestration systems, integrated observability, enhanced system reliability by 90%"
      },
      {
        company: "Paytm",
        role: "Senior Software Engineer",
        period: "Sep 2020 – Mar 2024",
        description: "Built Merchant Analytics platform, scaled to 100K+ merchants, reduced operational costs by 40%"
      },
      {
        company: "Cars24",
        role: "Software Engineer",
        period: "Jun 2018 – Jul 2020",
        description: "Built microservices for Dealer Marketplace, reduced latency by 25%"
      }
    ],
    projects: [
      {
        name: "Intelligence Data Lake",
        company: "Oracle",
        description: "Workflow orchestration system with 90% reduction in stuck executions and 30% performance improvement"
      },
      {
        name: "Merchant Analytics",
        company: "Paytm",
        description: "Real-time analytics system serving 100K+ merchants with 3-5x performance improvement"
      },
      {
        name: "Dealer Marketplace",
        company: "Cars24",
        description: "Real-time B2B auction platform with 25% latency reduction"
      }
    ],
    certifications: [
      "Oracle Certified Professional - Java SE 17 Developer",
      "AWS Certified Developer - Associate",
      "Oracle Cloud Infrastructure - Developer Professional"
    ]
  }

  const callGeminiAPI = async (message) => {
    const API_KEY = 'AIzaSyCIDcX9XgU2PKWrWd9Wm5rsj63Edc9Pt3Q'
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`
    
    const systemPrompt = `You are a professional AI assistant for Mohd Nayyar, a Software Development Engineer 3. 
    Your role is to answer questions about Mohd Nayyar's professional portfolio based ONLY on the provided data.
    
    Portfolio Data:
    ${JSON.stringify(portfolioData, null, 2)}
    
    Guidelines:
    1. Answer questions based solely on provided portfolio data
    2. Be professional, friendly, and helpful
    3. If information is not available in portfolio data, politely say so
    4. Provide specific details and metrics when available
    5. Keep responses SHORT and CONCISE (under 150 words maximum)
    6. Use markdown formatting for better readability
    7. For contact inquiries, provide available contact information
    8. For technical questions, highlight relevant skills and experience
    9. Be direct and to the point - avoid unnecessary fluff
    10. Prioritize clarity and brevity
    
    Do not:
    - Make up information not present in portfolio
    - Provide personal opinions or assumptions
    - Share sensitive personal information beyond what's in portfolio
    - Respond to inappropriate or off-topic questions
    - Write long, rambling responses
    - Use overly complex language
    
    Start responses with a friendly greeting and provide helpful, accurate information about Mohd Nayyar's professional background.`
    
    const requestBody = {
      contents: [
        { parts: [{ text: systemPrompt }] },
        { parts: [{ text: `User: ${message}` }] }
      ]
    }
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0]
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          return candidate.content.parts[0].text
        }
      }
      
      throw new Error('No valid response from Gemini API')
    } catch (error) {
      console.error('Gemini API Error:', error)
      return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment. If you have questions about Mohd Nayyar's portfolio, feel free to ask specific questions about his experience, skills, or projects!"
    }
  }


  
  const formatChatMessage = (text) => {
    return text
      // Convert markdown links [text](#section) to clickable links
      .replace(/\[([^\]]+)\]\(#([^\)]+)\)/g, '<a href="#$2" class="portfolio-link" data-section="$2">$1</a>')
      // Convert bold text **text** to <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert italic text *text* to <em>text</em>
      // Convert line breaks to <br>
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
  }

  const handlePortfolioLinkClick = (section) => {
    const sectionQueries = {
      'experience': 'Tell me about Mohd Nayyar experience',
      'skills': 'What skills does he have?',
      'projects': 'Tell me about his projects',
      'education': 'What is his educational background?',
      'certifications': 'Tell me about his certifications',
      'contact': 'How can I contact him?'
    }
    
    const query = sectionQueries[section]
    if (query) {
      sendMessage(query)
    }
  }

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return
    
    // Add user message
    const userMessage = { type: 'user', content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    
    // Auto-scroll to bottom after user message
    setTimeout(() => {
      const chatMessages = document.getElementById('chatMessages')
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }, 100)
    
    try {
      // Use Gemini API
      const response = await callGeminiAPI(messageText)
      
      // Add AI response
      const aiMessage = { type: 'ai', content: response }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      
      // Auto-scroll to bottom after AI response
      setTimeout(() => {
        const chatMessages = document.getElementById('chatMessages')
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight
        }
      }, 100)
      
      // Add event listeners for portfolio links
      setTimeout(() => {
        const portfolioLinks = document.querySelectorAll('.portfolio-link')
        portfolioLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault()
            const section = link.getAttribute('data-section')
            handlePortfolioLinkClick(section)
          })
        })
      }, 100)
    } catch (error) {
      setIsTyping(false)
      console.error('Error sending message:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  useEffect(() => {
    // Close chat when clicking outside
    const handleClickOutside = (e) => {
      const chatContainer = document.getElementById('chatContainer')
      const chatToggle = document.getElementById('chatToggle')
      if (chatContainer && chatToggle && !chatContainer.contains(e.target) && !chatToggle.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleResize = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const chatContainer = chatContainerRef.current
    if (!chatContainer) return

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = chatContainer.offsetWidth
    const startHeight = chatContainer.offsetHeight
    const rect = chatContainer.getBoundingClientRect()

    const handleMouseMove = (moveEvent) => {
      const deltaX = startX - moveEvent.clientX
      const deltaY = startY - moveEvent.clientY
      
      let newWidth = startWidth - deltaX
      let newHeight = startHeight - deltaY
      
      // Apply constraints
      newWidth = Math.max(300, Math.min(700, newWidth))
      newHeight = Math.max(350, Math.min(750, newHeight))
      
      chatContainer.style.width = newWidth + 'px'
      chatContainer.style.height = newHeight + 'px'
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    setIsResizing(true)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'nwse-resize'
    document.body.style.userSelect = 'none'
  }

  return (
    <div className="chat-assistant" id="chatAssistant">
      <div className="chat-toggle" id="chatToggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-robot"></i>
        <span>Ask AI</span>
      </div>
      <div className={`chat-container ${isOpen ? 'active' : ''}`} id="chatContainer" ref={chatContainerRef}>
        <div className="resize-handle" onMouseDown={handleResize}></div>
        <div className="chat-header">
          <h3>Portfolio AI Assistant</h3>
          <button className="chat-close" onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="chat-messages" id="chatMessages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}-message`}>
              <div className="message-content">
                <p dangerouslySetInnerHTML={{ __html: formatChatMessage(message.content) }} />
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message ai-message typing-indicator active">
              <div className="message-content">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Mohd Nayyar's portfolio..."
          />
          <button onClick={() => sendMessage()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
