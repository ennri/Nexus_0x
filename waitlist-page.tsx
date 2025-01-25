import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MatrixRain from "./components/MatrixRain"
import ScrambleText from "./components/ScrambleText"
import CountdownTimer from "./components/CountdownTimer"
import CountUpText from "./components/CountUpText"
import { Silkscreen } from "next/font/google"
import GlitchText from "./components/GlitchText"
import PageLoader from "./components/PageLoader"
import AnimatedEllipsis from './components/AnimatedEllipsis'

const silkscreen = Silkscreen({ subsets: ["latin"], weight: "400" })

const WaitlistPage = () => {
  const [email, setEmail] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), Math.random() * 200 + 100)
    }, Math.random() * 3000 + 2000)
    return () => clearInterval(glitchInterval)
  }, [])

  const variants = {
    normal: { 
      x: 0,
      y: 0,
      filter: "hue-rotate(0deg) saturate(100%)"
    },
    glitch: {
      x: [0, -2, 2, -2, 2, 0].map(v => v * (Math.random() + 0.5)),
      y: [0, 2, -2, 2, -2, 0].map(v => v * (Math.random() + 0.5)),
      filter: [
        "hue-rotate(0deg) saturate(100%)",
        `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 200 + 100}%)`,
        `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 200 + 100}%)`,
        `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 200 + 100}%)`,
        "hue-rotate(0deg) saturate(100%)",
      ],
      transition: { 
        duration: Math.random() * 0.1 + 0.1,
        repeat: Math.floor(Math.random() * 3) + 2,
        ease: "linear"
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />

      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-6 md:grid-cols-12 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.5 }}
              className="text-green-500 font-mono text-2xl"
            >
              <ScrambleText text="INITIALIZING" duration={1200} />
              <AnimatedEllipsis />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 min-h-screen flex items-center justify-center"
          >
            <motion.div 
              className="w-full max-w-md md:max-w-2xl mx-auto px-4 md:px-8 py-4 md:py-8 text-center bg-black/70 backdrop-blur-sm rounded-lg shadow-lg"
              animate={glitchActive ? "glitch" : "normal"}
              variants={variants}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-6 md:grid-cols-12 h-full">
                  {[...Array(72)].map((_, i) => (
                    <div key={i} className="border border-white/[0.04]" />
                  ))}
                </div>
              </div>
              
              <motion.div
                className="relative z-10 w-full max-w-md md:max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-16 text-center bg-black/70 backdrop-blur-sm rounded-lg shadow-lg"
                animate={glitchActive ? "glitch" : "normal"}
                variants={{
                  normal: { scale: 1 },
                  glitch: {
                    scale: [1, 1.02, 0.98, 1],
                    transition: {
                      duration: 0.2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }
                }}
              >
                <h1 className={`${silkscreen.className} text-3xl md:text-5xl mb-4 md:mb-8 relative text-white font-bold`}>
                  <span className="absolute -inset-1 blur-sm opacity-70 text-blue-400">
                    <GlitchText text="JOIN_THE_FUTURE" />
                  </span>
                  <GlitchText text="JOIN_THE_FUTURE" />
                </h1>
              
                <p className="font-mono text-sm md:text-lg mb-6 md:mb-12 text-blue-300 animate-pulse">
                  <ScrambleText text="> Initializing next-gen experience..." duration={800} />
                </p>
              
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border-2 border-blue-500 px-4 md:px-6 py-2 md:py-4 font-mono text-sm md:text-lg focus:outline-none focus:border-blue-300 transition-colors text-white placeholder-blue-300"
                    placeholder="enter_your_email@here.com"
                  />
              
                  <button
                    className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 px-4 md:px-8 py-2 md:py-4 font-mono text-sm md:text-lg transition-all duration-300 relative group text-white font-bold"
                    onClick={() => setGlitchActive(true)}
                  >
                    <span className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <ScrambleText text="> INITIALIZE_ACCESS" duration={900} />
                  </button>
                </div>
              
                <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 font-mono text-xs md:text-sm bg-black/50 p-4 rounded-lg">
                  <div>
                    <div className="text-blue-300 mb-1 md:mb-2">
                      <ScrambleText text="USERS_WAITING" duration={1000} />
                    </div>
                    <div className="text-xl md:text-2xl text-white">
                      <CountUpText end={1337} duration={2000} />
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-300 mb-1 md:mb-2">
                      <ScrambleText text="ACCESS_GRANTED" duration={1100} />
                    </div>
                    <div className="text-xl md:text-2xl text-white">
                      <CountUpText end={42} duration={1800} />%
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-300 mb-1 md:mb-2">
                      <ScrambleText text="TIME_REMAINING" duration={1200} />
                    </div>
                    <div className="text-xl md:text-2xl text-white">
                      <CountdownTimer />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent bg-repeat-y z-20"
        style={{ backgroundSize: "100% 8px" }}
      />
    </div>
  )
}

export default WaitlistPage

