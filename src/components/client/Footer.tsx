'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSettings } from '@/lib/hooks/useData'

export default function Footer() {
  const { data: settings, error, isLoading } = useSettings()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading footer</div>
  if (!settings) return null

  return (
    <footer className="py-8" style={{ background: 'var(--background-color-2)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div 
          className="p-8 rounded-lg text-center"
          style={{
            background: 'var(--background-color-1)',
            boxShadow: 'var(--shadow-1)',
            fontFamily: 'var(--font-primary)'
          }}
        >
          <div className="mb-6">
            <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>
              {settings.logo_image && (
                <Image 
                  src={settings.logo_image}
                  alt="Logo" 
                  width={120} 
                  height={40}
                  className="object-contain mx-auto"
                  priority
                />
              )}
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
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
          <p style={{ color: 'var(--color-body)' }}>
            {settings.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}