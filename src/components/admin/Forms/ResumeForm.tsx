'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Education {
  id?: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Certification {
  id?: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
}

interface Skill {
  id?: string
  name: string
  level: number
  category: string
}

interface Experience {
  id?: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface ResumeFormProps {
  type: 'education' | 'certification' | 'skill' | 'experience'
  data?: Education | Certification | Skill | Experience
  onSuccess?: () => void
}

export default function ResumeForm({ type, data, onSuccess }: ResumeFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [skillLevel, setSkillLevel] = useState((data as Skill)?.level || 3)
  const [isCurrent, setIsCurrent] = useState((data as Experience)?.current || false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    let submitData: any = {}

    switch (type) {
      case 'education':
        submitData = {
          institution: formData.get('institution'),
          degree: formData.get('degree'),
          field: formData.get('field'),
          startDate: formData.get('startDate'),
          endDate: formData.get('endDate'),
          gpa: formData.get('gpa')
        }
        break

      case 'certification':
        submitData = {
          name: formData.get('name'),
          issuer: formData.get('issuer'),
          issueDate: formData.get('issueDate'),
          expiryDate: formData.get('expiryDate'),
          credentialId: formData.get('credentialId')
        }
        break

      case 'skill':
        submitData = {
          name: formData.get('name'),
          level: skillLevel,
          category: formData.get('category')
        }
        break

      case 'experience':
        submitData = {
          title: formData.get('title'),
          company: formData.get('company'),
          location: formData.get('location'),
          startDate: formData.get('startDate'),
          endDate: isCurrent ? 'Present' : formData.get('endDate'),
          current: isCurrent,
          description: formData.get('description')
        }
        break
    }

    try {
      const url = data ? `/api/resume/${type}/${data.id}` : `/api/resume/${type}`
      const method = data ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      if (!response.ok) throw new Error(`Failed to save ${type}`)
      
      onSuccess?.() // Call the success callback after successful submission
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderEducationForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Institution</label>
        <input
          type="text"
          name="institution"
          defaultValue={(data as Education)?.institution}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Degree</label>
        <input
          type="text"
          name="degree"
          defaultValue={(data as Education)?.degree}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Field of Study</label>
        <input
          type="text"
          name="field"
          defaultValue={(data as Education)?.field}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            defaultValue={(data as Education)?.startDate}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            defaultValue={(data as Education)?.endDate}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GPA (optional)</label>
        <input
          type="text"
          name="gpa"
          defaultValue={(data as Education)?.gpa}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </>
  )

  const renderCertificationForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Certification Name</label>
        <input
          type="text"
          name="name"
          defaultValue={(data as Certification)?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
        <input
          type="text"
          name="issuer"
          defaultValue={(data as Certification)?.issuer}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Issue Date</label>
          <input
            type="date"
            name="issueDate"
            defaultValue={(data as Certification)?.issueDate}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry Date (optional)</label>
          <input
            type="date"
            name="expiryDate"
            defaultValue={(data as Certification)?.expiryDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Credential ID (optional)</label>
        <input
          type="text"
          name="credentialId"
          defaultValue={(data as Certification)?.credentialId}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </>
  )

  const renderSkillForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Skill Name</label>
        <input
          type="text"
          name="name"
          defaultValue={(data as Skill)?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          defaultValue={(data as Skill)?.category}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Programming">Programming</option>
          <option value="Tools">Tools</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="Languages">Languages</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSkillLevel(level)}
              className={`text-2xl ${level <= skillLevel ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    </>
  )

  const renderExperienceForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          name="title"
          defaultValue={(data as Experience)?.title}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          name="company"
          defaultValue={(data as Experience)?.company}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          defaultValue={(data as Experience)?.location}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            defaultValue={(data as Experience)?.startDate}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <div className="space-y-2">
            <input
              type="date"
              name="endDate"
              defaultValue={(data as Experience)?.endDate}
              disabled={isCurrent}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-600">Current Position</label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={(data as Experience)?.description}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {type === 'education' && renderEducationForm()}
      {type === 'certification' && renderCertificationForm()}
      {type === 'skill' && renderSkillForm()}
      {type === 'experience' && renderExperienceForm()}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : `Save ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </button>
      </div>
    </form>
  )
}