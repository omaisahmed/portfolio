'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface Profile {
  id?: string
  name: string
  title: string
  bio: string
  githubUrl?: string
  linkedinUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  whatsappNumber?: string
  twitterUrl?: string
  personalWebsite?: string
  // Add any other new fields here
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile')
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      title: formData.get('title'),
      bio: formData.get('bio'),
      githubUrl: formData.get('githubUrl'),
      linkedinUrl: formData.get('linkedinUrl'),
      facebookUrl: formData.get('facebookUrl'),
      instagramUrl: formData.get('instagramUrl'),
      whatsappNumber: formData.get('whatsappNumber'),
      twitterUrl: formData.get('twitterUrl'),
      personalWebsite: formData.get('personalWebsite')
      // Add any other new fields here
    }

    try {
      const url = profile ? `/api/profile/${profile.id}` : '/api/profile'
      const method = profile ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save profile')
      
      // Replace alert with toast notification
      toast.success('Profile saved successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      
      router.refresh()
    } catch (error) {
      console.error('Error saving profile:', error)
      // Show error toast instead of alert
      toast.error('Error saving profile. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Profile</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="dashboard-label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={profile?.name}
              className="dashboard-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={profile?.title}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={profile?.bio}
              rows={4}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="githubUrl">GitHub URL</label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              defaultValue={profile?.githubUrl ?? undefined}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="linkedinUrl">LinkedIn URL</label>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              defaultValue={profile?.linkedinUrl ?? undefined}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="facebookUrl">Facebook URL</label>
            <input
              id="facebookUrl"
              name="facebookUrl"
              type="url"
              defaultValue={profile?.facebookUrl ?? undefined}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="instagramUrl">Instagram URL</label>
            <input
              id="instagramUrl"
              name="instagramUrl"
              type="url"
              defaultValue={profile?.instagramUrl ?? undefined}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="whatsappNumber">WhatsApp Number</label>
            <input
              id="whatsappNumber"
              name="whatsappNumber"
              type="tel"
              defaultValue={profile?.whatsappNumber ?? undefined}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="twitterUrl">Twitter URL</label>
            <input
              id="twitterUrl"
              name="twitterUrl"
              type="url"
              defaultValue={profile?.twitterUrl ?? undefined}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="personalWebsite">Personal Website</label>
            <input
              id="personalWebsite"
              name="personalWebsite"
              type="url"
              defaultValue={profile?.personalWebsite ?? undefined}
              className="mt-1 block w-full px-4 py-3 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--color-subtitle)] text-white px-6 py-3 text-base font-medium rounded-md hover:bg-[var(--color-subtitle)] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}