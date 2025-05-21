'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Header from '@/components/client/Header'
import Portfolio from '@/components/client/Portfolio'
import Services from '@/components/client/Services'
import Resume from '@/components/client/Resume'
import Contact from '@/components/client/Contact'
import Footer from '@/components/client/Footer'
import Testimonials from '@/components/client/Testimonials'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    // Create a promise that resolves after a small delay to ensure content is ready
    const loadContent = async () => {
      try {
        // Wait for the next frame to ensure React has finished rendering
        await new Promise(resolve => requestAnimationFrame(resolve))
        // Add a small delay to ensure all content is properly rendered
        await new Promise(resolve => setTimeout(resolve, 500))
        setContentReady(true)
        // Add a small delay before hiding the spinner
        setTimeout(() => setIsLoading(false), 100)
      } catch (error) {
        console.error('Error loading content:', error)
        setIsLoading(false)
      }
    }

    loadContent()
  }, [])

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  }
  
  if (isLoading || !contentReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{ borderColor: 'var(--color-subtitle)' }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <motion.main
        initial="initial"
        animate="animate"
        viewport={{ once: true }}
      >
        <motion.div {...fadeInUp}>
          <Services />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Portfolio />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Resume />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Testimonials />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Contact />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  )
}
