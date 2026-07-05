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

  const postChat = async (messages) => {
    try {
      const r = await fetch("/api/chat/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages })
      })
      return await r.json()
    } catch (error) {
      return { error: "Network hiccup — please try again." }
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

    // Build neutral messages array from prior conversation + new user turn.
    // State updates are async, so derive from the known prior `messages` directly.
    const neutralMessages = [...messages, userMessage].map(m => ({
      role: m.type === 'user' ? 'user' : 'assistant',
      text: m.content
    }))

    try {
      const result = await postChat(neutralMessages)
      const response = result.message?.text || result.error || "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment. If you have questions about Mohd Nayyar's portfolio, feel free to ask specific questions about his experience, skills, or projects!"

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
