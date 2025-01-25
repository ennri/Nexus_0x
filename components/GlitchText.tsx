import type React from "react"
import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
}

const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const glitchChars = "!@#$%^&*<>[]{}|/\\"
    const interval = setInterval(() => {
      const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
      const position = Math.floor(Math.random() * text.length)
      const newText = text.substring(0, position) + randomChar + text.substring(position + 1)
      setGlitchText(newText)
      setTimeout(() => setGlitchText(text), 50)
    }, 2000)

    return () => clearInterval(interval)
  }, [text])

  return <span>{glitchText}</span>
}

export default GlitchText

