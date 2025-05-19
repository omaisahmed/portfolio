'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface Education {
  id?: string
  institution: string
  degree: string
  startDate: string
  endDate: string
}

interface Certification {
  id?: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
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
  const [skillLevel, setSkillLevel] = useState((data as Skill)?.level * 20 || 60)
  const [isCurrent, setIsCurrent] = useState((data as Experience)?.current || false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    let submitData: any = {}

    switch (type) {
      case 'education':
        submitData = {
          institution: formData.get('institution')?.toString() || '',
          degree: formData.get('degree')?.toString() || '',
          startDate: formData.get('startDate')?.toString() || '',
          endDate: formData.get('endDate')?.toString() || ''
        }
        break

      case 'certification':
        submitData = {
          name: formData.get('name'),
          issuer: formData.get('issuer'),
          issueDate: formData.get('issueDate'),
          expiryDate: formData.get('expiryDate')
        }
        break

      case 'skill':
        submitData = {
          name: formData.get('name'),
          level: Math.round(skillLevel / 20) || 1, // Ensure minimum level of 1
          category: formData.get('category')
        }
        break

      case 'experience':
        submitData = {
          title: formData.get('title'),
          company: formData.get('company'),
          startDate: formData.get('startDate'),
          endDate: isCurrent ? null : formData.get('endDate'), // Change 'Present' to null
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

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || `Failed to save ${type}`)
      }
      
      toast.success(`${type} saved successfully!`)
      onSuccess?.()
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : `Failed to save ${type}`)
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
          className="dashboard-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Degree</label>
        <input
          type="text"
          name="degree"
          defaultValue={(data as Education)?.degree}
          required
          className="dashboard-input"
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
            className="dashboard-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            defaultValue={(data as Education)?.endDate}
            required
            className="dashboard-input"
          />
        </div>
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
          className="dashboard-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
        <input
          type="text"
          name="issuer"
          defaultValue={(data as Certification)?.issuer}
          required
          className="dashboard-input"
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
            className="dashboard-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry Date (optional)</label>
          <input
            type="date"
            name="expiryDate"
            defaultValue={(data as Certification)?.expiryDate}
            className="dashboard-input"
          />
        </div>
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
          className="dashboard-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          defaultValue={(data as Skill)?.category}
          required
          className="dashboard-input"
        >
          <option value="Programming">Programming</option>
          <option value="Tools">Tools</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="Languages">Languages</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Percentage (%)</label>
        <input
          type="number"
          name="level"
          min="0"
          max="100"
          value={skillLevel || ''}
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Number(e.target.value)
            if (typeof value === 'number' && !isNaN(value)) {
              const clampedValue = Math.min(Math.max(value, 0), 100)
              setSkillLevel(clampedValue)
            }
          }}
          required
          className="dashboard-input"
        />
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
          className="dashboard-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          name="company"
          defaultValue={(data as Experience)?.company}
          required
          className="dashboard-input"
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
            className="dashboard-input"
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
              className="dashboard-input disabled:bg-gray-100"
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
          className="dashboard-input"
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

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/dashboard/resume')}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors cursor-pointer"
          style={{
            background: 'var(--color-primary)',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Saving...' : data ? `Update ${type}` : `Add ${type}`}
        </button>
      </div>
    </form>
  )
}