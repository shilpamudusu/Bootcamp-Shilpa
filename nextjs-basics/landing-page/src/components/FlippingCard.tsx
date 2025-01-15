'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FlippingCardProps {
  title: string
  description: string
  link: string
}

export default function FlippingCard({ title, description, link }: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="w-full h-48 perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-lg p-4 flex flex-col justify-between text-white">
          <h2 className="text-xl font-bold">{title}</h2>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-300 transition-colors mt-2 inline-block text-sm"
          >
            View Project
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg p-4 flex flex-col justify-between text-white transform rotate-y-180">
          <p className="text-xs">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-300 transition-colors mt-2 inline-block text-sm"
          >
            Visit Site
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </motion.div>
    </div>
  )
}

