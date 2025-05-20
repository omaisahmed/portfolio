'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Card from '@/components/admin/Card'
import ContactForm from '@/components/admin/Forms/ContactForm'

interface ContactInfo {
  id: string
  email: string
  phone: string
  address: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/contact')
      if (!response.ok) throw new Error('Failed to fetch contact information')
      const data = await response.json()
      setContactInfo(data)
    } catch (error) {
      console.error('Error fetching contact information:', error)
      toast.error('Failed to load contact information')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p>Loading contact information...</p>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Contact Information</h1>
      </div>
      
      <Card>
        <ContactForm contact={contactInfo} />
      </Card>
    </div>
  )
}