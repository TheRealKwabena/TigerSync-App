import { createContext, useContext, useState, useCallback } from 'react'

const UIContext = createContext()

function getAIResponse(message) {
  const msg = message.toLowerCase()
  if (msg.includes('gpa'))
    return "Your current GPA is **3.67**, which is excellent! You're in the top 15% of your cohort. To reach a 3.8 by graduation, aim for mostly A grades in your remaining 48 credits."
  if (msg.includes('financial') || msg.includes('aid') || msg.includes('fafsa'))
    return "Your **2025–2026 financial aid** package totals $12,548. Your FAFSA is verified and your Pell Grant of $3,298 is awarded. There's a $245 outstanding balance on your Lab & Technology Fee — clearing this will lift your account hold."
  if (msg.includes('graduation') || msg.includes('graduate') || msg.includes('grad'))
    return "Based on your current **72 of 120 credits**, you're on track to graduate **Spring 2027**. You need 48 more credits across core CS, math, and general education requirements."
  if (msg.includes('hold'))
    return "You have **2 account holds**: (1) a $245 Lab & Technology Fee balance, and (2) a pending immunization record submission. Both must be cleared before you can register for next semester."
  if (msg.includes('advisor') || msg.includes('torres') || msg.includes('appointment'))
    return "**Dr. Rebecca Torres** is your assigned advisor in Foster Hall 204. Her next available slot is **March 28th at 2:00 PM**. Head to the Advising page to book it directly."
  if (msg.includes('course') || msg.includes('class') || msg.includes('register') || msg.includes('fall'))
    return "For **Fall 2026**, I recommend: **CS 401** (Advanced Algorithms), **CS 415** (Machine Learning), **CS 450** (Software Engineering), and **MATH 301** (Linear Algebra). These cover your core requirements and keep you on the graduation path."
  if (msg.includes('degree') || msg.includes('audit') || msg.includes('progress'))
    return "You're **60% through** your CS degree. Natural Sciences are fully complete. Mathematics needs 7 more credits. Core CS still needs 18+ credits including your senior capstone."
  if (msg.includes('scholarship') || msg.includes('money') || msg.includes('grant'))
    return "You qualify for **4 scholarships** on the Financial Aid page. The Thurgood Marshall College Fund ($5,000) and UNCF ($2,500) both match your profile. Apply before the deadline!"
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey'))
    return "Hey Jordan! 👋 I'm TigerAI, your academic assistant. I can help with your GPA, courses, financial aid, advisor appointments, and graduation planning. What do you need?"
  if (msg.includes('help') || msg.includes('what can'))
    return "I can help you with:\n• **GPA & grades** — analysis and improvement tips\n• **Course registration** — recommendations for next semester\n• **Financial aid** — status, scholarships, holds\n• **Advising** — scheduling with Dr. Torres\n• **Graduation** — tracking your degree progress"
  return "Great question! I'm here to support your academic success at TigerSync. Try asking me about your **GPA**, **courses for next semester**, **financial aid status**, or **graduation requirements**. I can also help you prep for your advising appointment!"
}

export function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi Jordan! I'm **TigerAI**, your academic assistant powered by AI. Ask me anything about your courses, GPA, financial aid, or graduation plan.",
    },
  ])

  const sendMessage = useCallback((text) => {
    const userMsg = { id: Date.now(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)
    setTimeout(() => {
      const response = getAIResponse(text)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', content: response },
      ])
      setTyping(false)
    }, 900)
  }, [])

  return (
    <UIContext.Provider
      value={{ sidebarOpen, setSidebarOpen, chatOpen, setChatOpen, messages, sendMessage, typing }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => useContext(UIContext)
