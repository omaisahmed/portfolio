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
  endDate?: string  // Make it optional here too
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
  const [skillLevel, setSkillLevel] = useState((data as Skill)?.level || 20) // Remove the multiplication by 20
  const [isCurrent, setIsCurrent] = useState((data as Experience)?.current || false)
  const [dateError, setDateError] = useState<string>('')

  const validateDates = (startDate: string, endDate?: string) => {
    if (!startDate) return false
    if (!endDate && !isCurrent) return false
    
    const start = new Date(startDate)
    if (endDate) {
      const end = new Date(endDate)
      // Check if dates are the same or end is earlier
      if (end.getTime() <= start.getTime()) {
        setDateError('End date must be later than start date')
        return false
      }
    }
    
    setDateError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Validate dates based on form type
    const startDate = formData.get('startDate')?.toString() || ''
    const endDate = formData.get('endDate')?.toString()
    const issueDate = formData.get('issueDate')?.toString()
    const expiryDate = formData.get('expiryDate')?.toString()

    if (type === 'education' || type === 'experience') {
      if (!validateDates(startDate, endDate)) {
        return
      }
    } else if (type === 'certification' && expiryDate) {
      if (!validateDates(issueDate!, expiryDate)) {
        return
      }
    }

    setLoading(true)
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
          level: Number(skillLevel), // Store the actual percentage value
          category: formData.get('category')
        }
        break

      case 'experience':
        submitData = {
          title: formData.get('title'),
          company: formData.get('company'),
          startDate: formData.get('startDate'),
          endDate: isCurrent ? undefined : formData.get('endDate')?.toString(),  // Use undefined instead of null
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

      let responseData
      try {
        responseData = await response.json()
      } catch (err) {
        throw new Error(`Failed to parse response from server`)
      }

      if (!response.ok) {
        throw new Error(
          responseData?.message || 
          responseData?.error || 
          `Failed to save ${type}. Status: ${response.status}`
        )
      }
      
      toast.success(`${type} saved successfully!`)
      onSuccess?.()
      router.push('/dashboard/resume')
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
            onChange={(e) => {
              const endDateInput = e.currentTarget.form?.querySelector('input[name="endDate"]') as HTMLInputElement
              if (endDateInput && endDateInput.value && new Date(endDateInput.value) <= new Date(e.target.value)) {
                setDateError('End date must be later than start date')
              } else {
                setDateError('')
              }
            }}
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
            onChange={(e) => {
              const startDateInput = e.currentTarget.form?.querySelector('input[name="startDate"]') as HTMLInputElement
              if (startDateInput && e.target.value && new Date(e.target.value) <= new Date(startDateInput.value)) {
                setDateError('End date must be later than start date')
              } else {
                setDateError('')
              }
            }}
            required
            className="dashboard-input"
          />
        </div>
      </div>
      {dateError && (
        <p className="text-red-500 text-sm mt-1">{dateError}</p>
      )}
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
            onChange={(e) => {
              const expiryDateInput = e.currentTarget.form?.querySelector('input[name="expiryDate"]') as HTMLInputElement
              if (expiryDateInput && expiryDateInput.value && new Date(expiryDateInput.value) <= new Date(e.target.value)) {
                setDateError('Expiry date must be later than issue date')
              } else {
                setDateError('')
              }
            }}
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
            onChange={(e) => {
              const issueDateInput = e.currentTarget.form?.querySelector('input[name="issueDate"]') as HTMLInputElement
              if (issueDateInput && e.target.value && new Date(e.target.value) <= new Date(issueDateInput.value)) {
                setDateError('Expiry date must be later than issue date')
              } else {
                setDateError('')
              }
            }}
            className="dashboard-input"
          />
        </div>
      </div>
      {dateError && (
        <p className="text-red-500 text-sm mt-1">{dateError}</p>
      )}
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
          type="text"
          name="level"
          pattern="[0-9]*"
          inputMode="numeric"
          min="0"
          max="100"
          value={skillLevel || ''}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '')
            if (value === '') {
              setSkillLevel(0)
            } else {
              const numValue = Number(value)
              if (!isNaN(numValue)) {
                const clampedValue = Math.min(Math.max(numValue, 0), 100)
                setSkillLevel(clampedValue)
              }
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
            onChange={(e) => {
              const endDateInput = e.currentTarget.form?.querySelector('input[name="endDate"]') as HTMLInputElement
              if (!isCurrent && endDateInput && endDateInput.value && new Date(endDateInput.value) <= new Date(e.target.value)) {
                setDateError('End date must be later than start date')
              } else {
                setDateError('')
              }
            }}
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
              required={!isCurrent}
              onChange={(e) => {
                if (!isCurrent) {
                  const startDateInput = e.currentTarget.form?.querySelector('input[name="startDate"]') as HTMLInputElement
                  if (startDateInput && e.target.value && new Date(e.target.value) <= new Date(startDateInput.value)) {
                    setDateError('End date must be later than start date')
                  } else {
                    setDateError('')
                  }
                }
              }}
              className={`dashboard-input ${isCurrent ? 'bg-gray-100' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="currentPosition"
                checked={isCurrent}
                onChange={(e) => {
                  setIsCurrent(e.target.checked)
                  if (e.target.checked) {
                    setDateError('')
                  }
                }}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="currentPosition" className="ml-2 text-sm text-gray-600">
                Current Position
              </label>
            </div>
          </div>
        </div>
      </div>
      {dateError && (
        <p className="text-red-500 text-sm mt-1">{dateError}</p>
      )}
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