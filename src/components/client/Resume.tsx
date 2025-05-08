'use client'

import { useState } from 'react'

export default function Resume() {
  const [activeTab, setActiveTab] = useState('education')

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
            className="rn-nav-list flex flex-wrap justify-between gap-4 p-4 rounded-lg"
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
              <div className="p-6 rounded-lg" style={{ background: 'var(--background-color-2)', boxShadow: 'var(--shadow-1)' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>Bachelor of Science in Computer Science</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--color-subtitle)' }}>2018 - 2022</p>
                <p style={{ color: 'var(--color-body)' }}>Federal Urdu University of Arts, Science & Technology</p>
              </div>
              {/* Add more education items as needed */}
            </div>
          </div>

          {/* Certifications Tab */}
          <div
            role="tabpanel"
            id="certifications"
            className={`${activeTab === 'certifications' ? 'block' : 'hidden'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg" style={{ background: 'var(--background-color-2)', boxShadow: 'var(--shadow-1)' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>Web Development</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--color-subtitle)' }}>2021</p>
                <p style={{ color: 'var(--color-body)' }}>SMIT - Saylani Mass IT Training Program</p>
              </div>
              {/* Add more certification items as needed */}
            </div>
          </div>

          {/* Professional Skills Tab */}
          <div
            role="tabpanel"
            id="professional"
            className={`${activeTab === 'professional' ? 'block' : 'hidden'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span style={{ color: 'var(--color-heading)' }}>React.js</span>
                    <span style={{ color: 'var(--color-primary)' }}>95%</span>
                  </div>
                  <div className="h-2 bg-[var(--background-color-2)] rounded-full">
                    <div className="h-full bg-[var(--color-primary)] rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                {/* Add more skill items as needed */}
              </div>
            </div>
          </div>

          {/* Experience Tab */}
          <div
            role="tabpanel"
            id="experience"
            className={`${activeTab === 'experience' ? 'block' : 'hidden'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg" style={{ background: 'var(--background-color-2)', boxShadow: 'var(--shadow-1)' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>Software Engineer</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--color-subtitle)' }}>2022 - Present</p>
                <p style={{ color: 'var(--color-body)' }}>Techwards - Software House</p>
                <ul className="list-disc list-inside mt-2" style={{ color: 'var(--color-body)' }}>
                  <li>Developed and maintained web applications using React.js</li>
                  <li>Collaborated with cross-functional teams</li>
                  <li>Implemented responsive designs and optimized performance</li>
                </ul>
              </div>
              {/* Add more experience items as needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}