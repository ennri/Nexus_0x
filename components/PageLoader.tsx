import React, { useEffect, useState } from 'react'
import MatrixRain from './MatrixRain'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  onLoadingComplete?: () => void
}

const PageLoader = ({ onLoadingComplete }: PageLoaderProps) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      onLoadingComplete?.()
    }, 2500)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <MatrixRain />
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-green-500 font-mono text-2xl"
            >
              INITIALIZING...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader