'use client'

import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

export function EntreeHero({ children, delai = 0 }: { children: React.ReactNode; delai?: number }) {
  const reduire = useReducedMotion()
  return (
    <motion.div
      initial={reduire ? false : { y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: reduire ? 0 : delai, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
