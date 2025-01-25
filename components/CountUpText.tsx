import type React from "react"
import { useState, useEffect } from "react"

interface CountUpTextProps {
  end: number
  duration?: number
}

const CountUpText: React.FC<CountUpTextProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      setCount(Math.floor(end * percentage))
      if (percentage < 1) {
        requestAnimationFrame(animateCount)
      }
    }
    requestAnimationFrame(animateCount)
  }, [end, duration])

  return <span>{count.toString().padStart(2, "0")}</span>
}

export default CountUpText

