'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  images: string[]  // Changed from imageUrl to images array
  githubUrl?: string
  liveUrl?: string
  tags: string[]
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{[key: string]: number}>({})
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    projectId: '',
    currentIndex: 0
  })

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        // Initialize current image indexes
        const indexes = data.reduce((acc: {[key: string]: number}, project: Project) => {
          acc[project.id] = 0
          return acc
        }, {})
        setCurrentImageIndexes(indexes)
      })
      .catch(error => console.error('Error fetching projects:', error))
  }, [])

  const nextImage = (projectId: string, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalImages
    }))
  }

  const prevImage = (projectId: string, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + totalImages) % totalImages
    }))
  }

  const openLightbox = (projectId: string, index: number) => {
    setLightbox({
      isOpen: true,
      projectId,
      currentIndex: index
    })
  }

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      projectId: '',
      currentIndex: 0
    })
  }

  const nextLightboxImage = () => {
    const project = projects.find(p => p.id === lightbox.projectId)
    if (project) {
      setLightbox(prev => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % project.images.length
      }))
    }
  }

  const prevLightboxImage = () => {
    const project = projects.find(p => p.id === lightbox.projectId)
    if (project) {
      setLightbox(prev => ({
        ...prev,
        currentIndex: (prev.currentIndex - 1 + project.images.length) % project.images.length
      }))
    }
  }

  return (
    <section id="portfolio" className="py-20" style={{ background: 'var(--background-color-2)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-lg mb-4 block" style={{ color: 'var(--color-subtitle)', fontFamily: 'var(--font-primary)' }}>
            Visit My Portfolio
          </span>
          <h2 className="text-4xl font-bold" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-secondary)' }}>
            My Portfolio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card rounded-lg transition-all duration-400 hover:translate-y-[-10px]" style={{ background: 'var(--background-color-1)', boxShadow: 'var(--shadow-1)', fontFamily: 'var(--font-primary)' }}>
              <div className="relative h-48 overflow-hidden group">
                {project.images && project.images.length > 0 && (
                  <>
                    <Image
                      src={project.images[currentImageIndexes[project.id]]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-400"
                      loading="lazy" // Add lazy loading
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add responsive sizes
                    />
                    <div 
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      onClick={() => openLightbox(project.id, currentImageIndexes[project.id])}
                    >
                      <div className="flex items-center gap-2 text-white">
                        <Eye size={24} />
                        <span>View</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
                  {project.title}
                </h3>
                <p className="mb-4" style={{ color: 'var(--color-body)' }}>
                  {project.description}
                </p>
                <div className="portfolio-tags mb-4">
                  {Array.isArray(project.tags) && project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="hover:text-[var(--color-primary)] transition-colors duration-400"
                      style={{
                        color: 'var(--color-primary)',
                        display: 'block',
                        fontSize: '14px',
                        padding: '0 15px',
                        height: '36px',
                        lineHeight: '36px',
                        borderRadius: '6px',
                        background: 'var(--background-color-1)',
                        boxShadow: 'var(--shadow-1)',
                        transition: 'var(--transition)',
                        fontWeight: 500
                      }}
                    >
                      Live Demo
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="hover:text-[var(--color-primary)] transition-colors duration-400"
                      style={{
                        color: 'var(--color-primary)',
                        display: 'block',
                        fontSize: '14px',
                        padding: '0 15px',
                        height: '36px',
                        lineHeight: '36px',
                        borderRadius: '6px',
                        background: 'var(--background-color-1)',
                        boxShadow: 'var(--shadow-1)',
                        transition: 'var(--transition)',
                        fontWeight: 500
                      }}
                    >
                      Source Code
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox.isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
          >
            ×
          </button>
          <button
            onClick={prevLightboxImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:text-gray-300"
          >
            ←
          </button>
          <button
            aria-label="Previous image"
            onClick={prevLightboxImage}
            onKeyDown={(e) => e.key === 'Enter' && prevLightboxImage()}
            tabIndex={0}
          >
            {/* button content */}
          </button>
          <button
            onClick={nextLightboxImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:text-gray-300"
          >
            →
          </button>
          {projects.find(p => p.id === lightbox.projectId)?.images.map((image, index) => (
            <div
              key={index}
              className={`transition-opacity duration-300 ${
                index === lightbox.currentIndex ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <Image
                src={image}
                alt={`Project image ${index + 1}`}
                width={1200}
                height={800}
                className="max-w-[90vw] max-h-[90vh] object-contain"
              />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.find(p => p.id === lightbox.projectId)?.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setLightbox(prev => ({ ...prev, currentIndex: index }))}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === lightbox.currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}