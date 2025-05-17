'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ServiceForm from '@/components/admin/Forms/ServiceForm'
import Card from '@/components/admin/Card'
import { toast } from 'react-toastify'

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export default function EditServicePage() {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            toast.error('Service not found')
            router.push('/dashboard/services')
            return
          }
          throw new Error('Failed to fetch service')
        }
        
        const data = await response.json()
        setService(data)
      } catch (error) {
        console.error('Error fetching service:', error)
        toast.error('Failed to load service')
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [id, router])

  if (loading) {
    return <p>Loading service...</p>
  }

  if (!service) {
    return <p>Service not found</p>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Edit Service</h1>
      </div>
      
      <Card>
        <ServiceForm service={service} />
      </Card>
    </div>
  )
}