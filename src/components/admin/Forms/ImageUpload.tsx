'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  label: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label
}) => {
  const [loading, setLoading] = useState(false)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
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
      onChange(data.url)
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="imageUpload"
      />
      <label
        htmlFor="imageUpload"
        className="cursor-pointer block p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-400 transition"
      >
        {loading ? (
          <span>Uploading...</span>
        ) : (
          <span>{label}</span>
        )}
      </label>
      {value && (
        <div className="relative w-full h-40">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload