// API Provider Abstraction Layer
// Supports switching between Google Gemini and OpenRouter APIs

const API_PROVIDERS = {
  GOOGLE: 'google',
  OPENROUTER: 'openrouter'
}

class APIProvider {
  constructor(provider = API_PROVIDERS.GOOGLE, config = {}) {
    this.provider = provider
    this.config = config
  }

  async generateContent(systemPrompt, userMessage) {
    switch (this.provider) {
      case API_PROVIDERS.GOOGLE:
        return this.callGoogleAPI(systemPrompt, userMessage)
      case API_PROVIDERS.OPENROUTER:
        return this.callOpenRouterAPI(systemPrompt, userMessage)
      default:
        throw new Error(`Unsupported API provider: ${this.provider}`)
    }
  }

  async callGoogleAPI(systemPrompt, userMessage) {
    const API_KEY = this.config.apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`
    
    const requestBody = {
      contents: [
        { parts: [{ text: systemPrompt }] },
        { parts: [{ text: `User: ${userMessage}` }] }
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
        throw new Error(`Google API error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0]
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          return candidate.content.parts[0].text
        }
      }
      
      throw new Error('No valid response from Google Gemini API')
    } catch (error) {
      console.error('Google API Error:', error)
      throw error
    }
  }

  async callOpenRouterAPI(systemPrompt, userMessage) {
    const API_KEY = this.config.apiKey || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
    const MODEL = this.config.model || process.env.NEXT_PUBLIC_OPENROUTER_MODEL || 'google/gemini-flash-1.5'
    const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
    
    const requestBody = {
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    }
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
          'X-Title': 'Portfolio Chatbot'
        },
        body: JSON.stringify(requestBody)
      })
      
      if (!response.ok) {
        throw new Error(`OpenRouter API error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content
      }
      
      throw new Error('No valid response from OpenRouter API')
    } catch (error) {
      console.error('OpenRouter API Error:', error)
      throw error
    }
  }

  static fromEnv() {
    const provider = process.env.NEXT_PUBLIC_API_PROVIDER || API_PROVIDERS.GOOGLE
    const config = {}
    
    if (provider === API_PROVIDERS.GOOGLE) {
      config.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    } else if (provider === API_PROVIDERS.OPENROUTER) {
      config.apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
      config.model = process.env.NEXT_PUBLIC_OPENROUTER_MODEL
    }
    
    return new APIProvider(provider, config)
  }
}

export { APIProvider, API_PROVIDERS }
