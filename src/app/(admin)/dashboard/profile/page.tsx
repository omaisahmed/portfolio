'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'

interface Profile {
  id?: string
  name: string
  title: string
  bio: string
  image: string
  githubUrl?: string
  linkedinUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  whatsappNumber?: string
  twitterUrl?: string
  personalWebsite?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      setProfile(prev => prev ? { ...prev, image: data.url } : { name: '', title: '', bio: '', image: data.url })
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Check if image exists
    if (!profile?.image) {
      toast.error('Profile image is required')
      setLoading(false)
      return
    }

    const data = {
      name: formData.get('name'),
      title: formData.get('title'),
      bio: formData.get('bio'),
      image: profile.image,
      githubUrl: formData.get('githubUrl') || null,
      linkedinUrl: formData.get('linkedinUrl') || null,
      facebookUrl: formData.get('facebookUrl') || null,
      instagramUrl: formData.get('instagramUrl') || null,
      whatsappNumber: formData.get('whatsappNumber') || null,
      twitterUrl: formData.get('twitterUrl') || null,
      personalWebsite: formData.get('personalWebsite') || null
    }

    try {
      const url = profile?.id ? `/api/profile/${profile.id}` : '/api/profile'
      const method = profile?.id ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to save profile')
      }

      setProfile(responseData)
      toast.success('Profile saved successfully!')
      router.refresh()
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save profile. Please try again.')
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
            <label className="block text-sm font-bold mb-2 text-gray-800">
              Profile Image <span className="text-red-500">*</span>
            </label>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Upload Image
              </button>
              {profile?.image && (
                <div className="relative w-full h-40">
                  <Image
                    src={profile.image}
                    alt="Profile image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
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
              className="bg-[var(--color-subtitle)] text-white px-6 py-3 text-base font-medium rounded-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}