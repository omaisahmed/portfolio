'use client'

import { useState } from 'react'
import { 
  useEducation,
  useExperience,
  useSkills,
  useCertifications
} from '@/lib/hooks/useData'

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
}

interface Skill {
  id: string
  name: string
  level: number
  category: string
}

interface Experience {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string
  current: boolean
}

export default function Resume() {
  const [activeTab, setActiveTab] = useState('education')
  const { data: education = [], isLoading: educationLoading } = useEducation()
  const { data: certifications = [], isLoading: certificationsLoading } = useCertifications()
  const { data: professional = [], isLoading: skillsLoading } = useSkills()
  const { data: experience = [], isLoading: experienceLoading } = useExperience()

  const loading = {
    education: educationLoading,
    certifications: certificationsLoading,
    professional: skillsLoading,
    experience: experienceLoading
  }

  const data = {
    education,
    certifications,
    professional,
    experience
  }

  return (
    <section id="resume" className="py-20" style={{ background: 'var(--background-color-1)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-lg mb-4 block" style={{ color: 'var(--color-subtitle)', fontFamily: 'var(--font-primary)' }}>
            My Resume
          </span>
          <h2 className="text-4xl font-bold" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-secondary)' }}>
            My Expertise
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <ul 
            className="rn-nav-list flex flex-wrap justify-between gap-4 p-1 rounded-lg"
            role="tablist"
            style={{
              background: 'var(--background-color-1)',
              boxShadow: 'var(--shadow-1)',
              border: '0 none',
              borderRadius: '10px'
            }}
          >
            {['education', 'certifications', 'professional', 'experience'].map((tab) => (
              <li key={tab} className="nav-item flex-1 text-center m-0">
                <button
                  className={`nav-link w-full px-2.5 py-7 capitalize text-base font-medium transition-all duration-500 rounded-lg ${
                    activeTab === tab 
                      ? 'active text-[#ff014f] bg-[var(--background-color-1)]'
                      : 'text-[#c4cfde] hover:text-[#ff014f]'
                  }`}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={tab}
                  style={{
                    fontFamily: 'var(--font-primary)',
                    border: '0 none',
                    outline: 'none',
                    background: activeTab === tab ? 'var(--background-color-1)' : 'transparent',
                    boxShadow: activeTab === tab ? 'var(--shadow-1)' : 'none'
                  }}
                >
                  {tab === 'professional' ? 'Professional Skills' : tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Education Tab */}
          <div
            role="tabpanel"
            id="education"
            className={`${activeTab === 'education' ? 'block' : 'hidden'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading[activeTab as keyof typeof loading] ? (
                <div>Loading...</div>
              ) : data[activeTab as keyof typeof data].map((edu: Education) => (
                <div key={edu.id} className="p-6 rounded-lg relative" style={{ background: 'var(--background-color-2)', boxShadow: 'var(--shadow-1)' }}>
                  <div className="flex flex-col mb-4 md:hidden" style={{ color: 'var(--color-subtitle)' }}>
                    <span className="text-sm">
                      {new Date(edu.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(edu.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm absolute top-6 right-6 hidden md:block" style={{ color: 'var(--color-subtitle)' }}>
                    {new Date(edu.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(edu.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="text-xl font-bold mb-2 md:pr-48" style={{ color: 'var(--color-heading)' }}>{edu.degree}</h3>
                  <p style={{ color: 'var(--color-body)' }}>{edu.institution}</p>
                  {edu.field && <p style={{ color: 'var(--color-body)' }}>{edu.field}</p>}
                  {edu.gpa && <p style={{ color: 'var(--color-body)' }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Tab */}
          <div
            role="tabpanel"
            id="certifications"
            className={`${activeTab === 'certifications' ? 'block' : 'hidden'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading[activeTab as keyof typeof loading] ? (
                <div>Loading...</div>
              ) : data[activeTab as keyof typeof data].map((cert: Certification) => (
                <div key={cert.id} className="p-6 rounded-lg relative" style={{ background: 'var(--background-color-2)', boxShadow: 'var(--shadow-1)' }}>
                  <div className="block mb-4 md:hidden" style={{ color: 'var(--color-subtitle)' }}>
                    <span className="text-sm inline-block">
                      {new Date(cert.issueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}{cert.expiryDate && ` - ${new Date(cert.expiryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                    </span>
                  </div>
                  <p className="text-sm absolute top-6 right-6 hidden md:block" style={{ color: 'var(--color-subtitle)' }}>
                    {new Date(cert.issueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}{cert.expiryDate && ` - ${new Date(cert.expiryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                  </p>
                  <h3 className="text-xl font-bold mb-2 pr-0 md:pr-48" style={{ color: 'var(--color-heading)' }}>{cert.name}</h3>
                  <p style={{ color: 'var(--color-body)' }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Skills Tab */}
          <div
            role="tabpanel"
            id="professional"
            className={`${activeTab === 'professional' ? 'block' : 'hidden'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading.professional ? (
                <div>Loading...</div>
              ) : (
                <>
                  {/* Left Column */}
                  <div className="space-y-4">
                    {data.professional
                      .filter((_: any, index: number) => index % 2 === 0)
                      .map((skill: Skill) => (
                        <div key={skill.id} className="skill-item">
                          <div className="flex justify-between mb-2">
                            <span style={{ color: 'var(--color-heading)' }}>{skill.name}</span>
                            <span style={{ color: 'var(--color-primary)' }}>{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-[var(--background-color-2)] rounded-full">
                            <div 
                              className="h-full bg-[var(--color-primary)] rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                    ))}
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-4">
                    {data.professional
                      .filter((_: any, index: number) => index % 2 === 1)
                      .map((skill: Skill) => (
                        <div key={skill.id} className="skill-item">
                          <div className="flex justify-between mb-2">
                            <span style={{ color: 'var(--color-heading)' }}>{skill.name}</span>
                            <span style={{ color: 'var(--color-primary)' }}>{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-[var(--background-color-2)] rounded-full">
                            <div 
                              className="h-full bg-[var(--color-primary)] rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Experience Tab */}
          <div
            role="tabpanel"
            id="experience"
            className={`${activeTab === 'experience' ? 'block' : 'hidden'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading.experience ? (
                <div>Loading...</div>
              ) : data.experience.map((exp: Experience) => (
                <div key={exp.id} className="p-6 rounded-lg relative" style={{ background: 'var(--background-color-2)', boxShadow: 'var(--shadow-1)' }}>
                  <div className="flex flex-col mb-4 md:hidden" style={{ color: 'var(--color-subtitle)' }}>
                    <span className="text-sm">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm absolute top-6 right-6 hidden md:block" style={{ color: 'var(--color-subtitle)' }}>
                    {new Date(exp.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="text-xl font-bold mb-2 md:pr-48" style={{ color: 'var(--color-heading)' }}>{exp.title}</h3>
                  <p style={{ color: 'var(--color-body)' }}>{exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}