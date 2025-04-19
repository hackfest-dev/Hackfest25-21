"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, User, Bot, Paperclip, Mic, ImageIcon } from "lucide-react"

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot", time: "10:00 AM" },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand your question. Let me help you with that.",
        "That's an interesting point. Here's what I think...",
        "I'm processing your request. Give me a moment.",
        "I've found some information that might help you.",
        "Let me check our database for that information.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">AI Assistant</h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <ImageIcon size={18} />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <Mic size={18} />
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-4 overflow-y-auto mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`flex items-start gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {message.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-right" : ""} text-gray-500`}>
                    {message.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-xl shadow-sm p-3">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Paperclip size={20} className="text-gray-500" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full py-2 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF] resize-none"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={input.trim() === ""}
            className={`p-3 rounded-full ${
              input.trim() === ""
                ? "bg-gray-100 text-gray-400"
                : "bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white"
            } transition-colors`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
