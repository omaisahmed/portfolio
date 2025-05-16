'use client'

import { motion } from 'framer-motion'
import Header from '@/components/client/Header'
import Portfolio from '@/components/client/Portfolio'
import Services from '@/components/client/Services'
import Resume from '@/components/client/Resume'
import Contact from '@/components/client/Contact'
import Footer from '@/components/client/Footer'
import Testimonials from '@/components/client/Testimonials'

export default function Home() {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
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
