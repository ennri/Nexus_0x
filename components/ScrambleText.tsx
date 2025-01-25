import type React from "react"
import { useState, useEffect } from "react"

interface ScrambleTextProps {
  text: string
  duration?: number
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, duration = 2000 }) => {
  const [scrambledText, setScrambledText] = useState(text)

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+"
    const interval = duration / text.length
    let currentIndex = 0

    const scrambleInterval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(scrambleInterval)
        return
      }

      setScrambledText((prev) =>
        prev
          .split("")
          .map((char, index) => (index < currentIndex ? text[index] : chars[Math.floor(Math.random() * chars.length)]))
          .join(""),
      )

      currentIndex++
    }, interval)

    return () => clearInterval(scrambleInterval)
  }, [text, duration])

  return <>{scrambledText}</>
}

export default ScrambleText

