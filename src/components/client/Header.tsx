'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Profile {
  name: string
  title: string
  bio: string
  image: string
  githubUrl?: string
  linkedinUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  whatsappNumber?: string
  twitterUrl?: string
}

export default function Header() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  // Move this outside the component to prevent recreation
  const rotatingTexts = ['Developer.', 'Software Engineer.', 'Professional Coder.']
  const typingSpeed = 100

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile')
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    
    fetchProfile()
  }, []) // Separate the profile fetch

  useEffect(() => {
    let currentText = rotatingTexts[textIndex]
    let currentChar = 0
    let typingInterval: NodeJS.Timeout | null = null
    let eraseInterval: NodeJS.Timeout | null = null
    
    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (currentChar <= currentText.length) {
          setDisplayText(currentText.slice(0, currentChar))
          currentChar++
        } else {
          if (typingInterval) clearInterval(typingInterval)
          setTimeout(() => {
            startErasing()
          }, 1500) // Wait before erasing
        }
      }, typingSpeed)
    }

    const startErasing = () => {
      currentChar = currentText.length
      eraseInterval = setInterval(() => {
        if (currentChar >= 0) {
          setDisplayText(currentText.slice(0, currentChar))
          currentChar--
        } else {
          if (eraseInterval) clearInterval(eraseInterval)
          setTextIndex((prev) => (prev + 1) % rotatingTexts.length)
        }
      }, typingSpeed / 2)
    }

    startTyping()

    return () => {
      if (typingInterval) clearInterval(typingInterval)
      if (eraseInterval) clearInterval(eraseInterval)
    }
  }, [textIndex, typingSpeed])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="min-h-screen" style={{ background: 'var(--background-color-2)' }}>
      <nav 
        className="fixed w-full z-50 py-6 transition-shadow duration-300" 
        style={{ 
          background: 'var(--background-color-2)',
          boxShadow: isScrolled ? 'var(--shadow-1)' : 'none'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>
              <Image 
                src="/assets/images/logo.png" 
                alt="Logo" 
                width={120} 
                height={40}
                className="object-contain"
                priority
              />
            </Link>
            {/* Modified menu for mobile responsiveness */}
            <div className="hidden md:flex space-x-8 flex-wrap">
              <Link 
                href="#services"
                className="hover:text-[var(--color-primary)] transition-colors duration-400"
                style={{ color: 'var(--color-lightn)' }}
              >
                Services
              </Link>
              <Link 
                href="#portfolio"
                className="hover:text-[var(--color-primary)] transition-colors duration-400"
                style={{ color: 'var(--color-lightn)' }}
              >
                Portfolio
              </Link>
              <Link 
                href="#resume"
                className="hover:text-[var(--color-primary)] transition-colors duration-400"
                style={{ color: 'var(--color-lightn)' }}
              >
                Resume
              </Link>
              <Link 
                href="#testimonials"
                className="hover:text-[var(--color-primary)] transition-colors duration-400"
                style={{ color: 'var(--color-lightn)' }}
              >
                Testimonials
              </Link>
              <Link 
                href="#contact"
                className="hover:text-[var(--color-primary)] transition-colors duration-400"
                style={{ color: 'var(--color-lightn)' }}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full px-4 flex items-center min-h-screen" style={{ background: 'var(--background-color-2)' }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-20 md:pt-0" // Added padding for mobile
            >
              <div className="content pt-16 md:pt-1"> {/* Increased padding top for mobile */}
                <span className="text-lg mb-4 block flex items-center gap-2" style={{ color: '#c4cfde', fontFamily: 'var(--font-primary)' }}>
                  Welcome to my portfolio! 
                  <Image src="/assets/icons/hello.gif" alt="hello" width={30} height={30} />
                </span>
                {profile && (
                  <>
                    <h1 className="title mb-4 text-5xl font-bold" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-secondary)' }}>
                      Hi, I'm {profile.name}
                      <br />
                      <span className="header-caption" style={{ marginTop: '1rem', display: 'block' }}>
                        a <span className="typing-text" style={{ color: 'var(--color-primary)' }}>{displayText}</span>
                      </span>
                    </h1>
                    <p className="description mb-6" style={{ color: 'var(--color-body)', fontFamily: 'var(--font-primary)' }}>
                      {profile.bio}
                    </p>
                    <div className="space-y-4">
                      <span className="block text-lg" style={{ color: 'var(--color-lightn)', fontFamily: 'var(--font-primary)' }}>
                        Meet me here
                      </span>
                      <div className="flex space-x-6">
                        {profile.facebookUrl && (
                          <Link href={profile.facebookUrl} target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                          </Link>
                        )}
                        {profile.instagramUrl && (
                          <Link href={profile.instagramUrl} target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                          </Link>
                        )}
                        {profile.linkedinUrl && (
                          <Link href={profile.linkedinUrl} target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                          </Link>
                        )}
                        {profile.githubUrl && (
                          <Link href={profile.githubUrl} target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                          </Link>
                        )}
                        {profile.twitterUrl && (
                          <Link href={profile.twitterUrl} target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                          </Link>
                        )}
                        {profile.whatsappNumber && (
                          <Link href={`https://wa.me/${profile.whatsappNumber}`} target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                        </Link>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
            <motion.div 
              className="order-1 md:order-2 flex justify-end md:mt-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="thumbnail">
                <div className="inner">
                  <Image 
                    src={profile?.image || '/assets/images/loader.gif'}
                    alt={`${profile?.name || 'Portfolio'} - Portfolio`}
                    width={500}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  )
}