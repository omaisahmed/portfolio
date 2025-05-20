'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/admin/Card'
import ResumeForm from '@/components/admin/Forms/ResumeForm'
import { toast } from 'react-toastify'
import ConfirmModal from '@/components/admin/ConfirmModal'

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
  // Add state for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const router = useRouter()

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
      toast.error('Failed to load data')
    }
  }

  const confirmDelete = (id: string) => {
    setItemToDelete(id)
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      const response = await fetch(`/api/resume/${activeTab}/${itemToDelete}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete item')
      
      toast.success('Item deleted successfully')
      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab as keyof ResumeData].filter(item => item.id !== itemToDelete)
      }))
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item')
    } finally {
      setIsModalOpen(false)
      setItemToDelete(null)
    }
  }

  const cancelDelete = () => {
    setIsModalOpen(false)
    setItemToDelete(null)
  }

  const handleFormSuccess = () => {
    setIsAdding(false)
    setIsEditing(null)
    fetchData()
  }

  const renderListItem = (item: Education | Certification | Skill | Experience) => {
    switch (activeTab) {
      case 'education':
        const edu = item as Education
        return (
          <>
            <h3 className="font-medium text-black">{edu.degree}</h3>
            <p className="text-gray-600">{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.field}</p>
            <p className="text-sm text-gray-500">
              {new Date(edu.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(edu.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
          </>
        )

      case 'certification':
        const cert = item as Certification
        return (
          <>
            <h3 className="font-medium text-black">{cert.name}</h3>
            <p className="text-gray-600">{cert.issuer}</p>
            <p className="text-sm text-gray-500">
              {new Date(cert.issueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} - {cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No Expiry'}
            </p>
            {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}
          </>
        )

      case 'skill':
        const skill = item as Skill
        return (
          <>
            <h3 className="font-medium text-black">{skill.name}</h3>
            <p className="text-gray-600">{skill.category}</p>
            <div className="flex items-center mt-1">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-[var(--color-primary)] h-2.5 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">{skill.level}%</span>
            </div>
          </>
        )

      case 'experience':
        const exp = item as Experience
        return (
          <>
            <h3 className="font-medium text-black">{exp.title}</h3>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.location}</p>
            <p className="text-sm text-gray-500">
              {new Date(exp.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="mt-2 text-gray-600">{exp.description}</p>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Resume Management</h1>
        {!isAdding && !isEditing && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Add New Entry
          </button>
        )}
      </div>

      <div className="mb-8 bg-white rounded-lg shadow">
        <div className="flex border-b">
          {['education', 'certification', 'skill', 'experience'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setIsAdding(false)
                setIsEditing(null)
              }}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'text-gray-500 hover:text-[var(--color-primary)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {isAdding || isEditing ? (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black" >
              {isEditing ? 'Edit' : 'Add New'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
          </div>
          <ResumeForm 
            type={activeTab as 'education' | 'certification' | 'skill' | 'experience'}
            data={isEditing ? data[activeTab as keyof ResumeData].find(item => item.id === isEditing) : undefined}
            onSuccess={handleFormSuccess}
          />
        </Card>
      ) : (
        <Card>
          <div className="space-y-4">
            {data[activeTab as keyof ResumeData].map(item => (
              <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    {renderListItem(item)}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => setIsEditing(item.id)}
                      className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {data[activeTab as keyof ResumeData].length === 0 && (
              <p className="text-center text-gray-500 py-4">No entries found. Add your first {activeTab} entry!</p>
            )}
          </div>
        </Card>
      )}

      {/* Add the confirmation modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title={`Delete ${activeTab}`}
        message={`Are you sure you want to delete this ${activeTab}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}