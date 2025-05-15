'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
  tags: string[]
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error))
  }, [])

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
            <div
              key={project.id}
              className="group rounded-lg overflow-hidden transition-all duration-400"
              style={{
                background: 'var(--background-color-1)',
                boxShadow: 'var(--shadow-1)',
                fontFamily: 'var(--font-primary)'
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-400"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
                  {project.title}
                </h3>
                <p className="mb-4" style={{ color: 'var(--color-body)' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 project-tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: 'var(--background-color-2)',
                        color: 'var(--color-heading)',
                        boxShadow: 'var(--inner-shadow)'
                      }}
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
    </section>
  )
}