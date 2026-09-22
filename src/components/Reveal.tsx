'use client'

import { motion, useReducedMotion } from 'motion/react'

export function Reveal({ children, delai = 0 }: { children: React.ReactNode; delai?: number }) {
  const reduire = useReducedMotion()
  return (
    <motion.div
      initial={reduire ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: reduire ? 0 : delai, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}
