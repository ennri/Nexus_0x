import type React from "react"
import { useState, useEffect } from "react"
import CountUpText from "./CountUpText"

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState({ minutes: 72, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer)
          return prevTime
        }
        if (prevTime.seconds === 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 }
        }
        return { ...prevTime, seconds: prevTime.seconds - 1 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <span>
      <CountUpText end={time.minutes} duration={500} />:
      <CountUpText end={time.seconds} duration={500} />
    </span>
  )
}

export default CountdownTimer

