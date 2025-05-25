'use client'

import { useState, useEffect } from 'react'
import { useTestimonials } from '@/lib/hooks/useData'

interface Testimonial {
  id: string
  name: string
  location: string
  content: string
  rating: number
}

export default function Testimonials() {
  const { data: testimonials, error, isLoading } = useTestimonials()
  const [currentIndex, setCurrentIndex] = useState(0)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg" style={{ color: 'var(--color-heading)' }}>Loading testimonials...</div>
      </div>
    )
  }

  if (error) return <div>Error loading testimonials</div>
  if (!testimonials || testimonials.length === 0) return null

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg" style={{ color: 'var(--color-heading)' }}>Loading testimonials...</div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-20" style={{ background: 'var(--background-color-1)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-lg mb-4 block" style={{ color: 'var(--color-subtitle)', fontFamily: 'var(--font-primary)' }}>
            See What Clients Say About Me
          </span>
          <h2 className="text-4xl font-bold" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-secondary)' }}>
            Testimonials
          </h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="max-w-[600px] mx-auto">
            <div 
              className="transition-opacity duration-500 ease-in-out"
              style={{ opacity: 1 }}
            >
              <div className="p-6 rounded-lg" style={{ background: 'var(--background-color-1)', boxShadow: 'var(--shadow-1)' }}>
                <div className="card-description">
                  <div className="title-area flex justify-between items-center mb-4">
                    <div className="title-info">
                      <h3 className="text-xl font-bold" style={{ color: 'var(--color-heading)' }}>
                        {testimonials[currentIndex]?.name}
                      </h3>
                      <span className="text-sm" style={{ color: 'var(--color-subtitle)' }}>
                        {testimonials[currentIndex]?.location}
                      </span>
                    </div>
                    <div className="rating flex gap-1">
                      {[...Array(testimonials[currentIndex]?.rating || 0)].map((_, i) => (
                        <span 
                          key={i}
                          className="text-yellow-400 text-xl"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="h-px w-full mb-4" style={{ background: 'var(--color-subtitle)', opacity: 0.2 }}></div>
                  <p style={{ color: 'var(--color-body)' }}>
                    {testimonials[currentIndex]?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_: Testimonial, index: number) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-[var(--color-primary)]' 
                    : 'bg-[var(--color-subtitle)] opacity-50'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}