'use client'

import { useState, useEffect } from 'react'
import ResumeForm from '@/components/admin/Forms/ResumeForm'

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
  credentialId?: string
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
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

type ResumeData = {
  education: Education[]
  certification: Certification[]
  skill: Skill[]
  experience: Experience[]
}

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState('education')
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [data, setData] = useState<ResumeData>({
    education: [],
    certification: [],
    skill: [],
    experience: []
  })

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/resume/${activeTab}`)
      if (!response.ok) throw new Error('Failed to fetch data')
      const items = await response.json()
      setData(prev => ({ ...prev, [activeTab]: items }))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/resume/${activeTab}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete item')
      
      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab as keyof ResumeData].filter(item => item.id !== id)
      }))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleFormSuccess = () => {
    setIsAdding(false)
    setIsEditing(null)
    fetchData()
  }

  const renderListView = () => (
    <div className="space-y-4">
      {data[activeTab as keyof ResumeData].map(item => (
        <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              {/* Education */}
              {activeTab === 'education' && (
                <>
                  <h3 className="font-medium">{(item as Education).degree}</h3>
                  <p className="text-gray-600">{(item as Education).institution}</p>
                  <p className="text-sm text-gray-500">{(item as Education).field}</p>
                  {(item as Education).gpa && (
                    <p className="text-sm text-gray-500">GPA: {(item as Education).gpa}</p>
                  )}
                </>
              )}

              {/* Certification */}
              {activeTab === 'certification' && (
                <>
                  <h3 className="font-medium">{(item as Certification).name}</h3>
                  <p className="text-gray-600">{(item as Certification).issuer}</p>
                  {(item as Certification).credentialId && (
                    <p className="text-sm text-gray-500">ID: {(item as Certification).credentialId}</p>
                  )}
                </>
              )}

              {/* Skill */}
              {activeTab === 'skill' && (
                <>
                  <h3 className="font-medium">{(item as Skill).name}</h3>
                  <p className="text-gray-600">{(item as Skill).category}</p>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= (item as Skill).level ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Experience */}
              {activeTab === 'experience' && (
                <>
                  <h3 className="font-medium">{(item as Experience).title}</h3>
                  <p className="text-gray-600">{(item as Experience).company}</p>
                  <p className="text-sm text-gray-500">{(item as Experience).location}</p>
                  <p className="mt-2 text-gray-600">{(item as Experience).description}</p>
                </>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setIsEditing(item.id)}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resume Management</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Entry
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['education', 'certification', 'skill', 'experience'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setIsAdding(false)
                setIsEditing(null)
              }}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {isAdding || isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {isEditing ? 'Edit' : 'Add New'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <button
              onClick={() => {
                setIsAdding(false)
                setIsEditing(null)
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          <ResumeForm 
            type={activeTab as any}
            data={isEditing ? data[activeTab as keyof ResumeData].find(item => item.id === isEditing) : undefined}
            onSuccess={handleFormSuccess}
          />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          {renderListView()}
        </div>
      )}
    </div>
  )
}