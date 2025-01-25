import React from 'react'
import { motion } from 'framer-motion'

const AnimatedEllipsis = () => {
  return (
    <span className="inline-flex">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "linear"
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  )
}

export default AnimatedEllipsis