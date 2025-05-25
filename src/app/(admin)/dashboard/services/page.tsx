'use client'

import { useState, useEffect } from 'react'
import { useServices } from '@/lib/hooks/useData'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Card from '@/components/admin/Card'
import ConfirmModal from '@/components/admin/ConfirmModal'

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export default function ServicesPage() {
  const { data: services, error, isLoading, mutate } = useServices()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!serviceToDelete) return

    try {
      const response = await fetch(`/api/services/${serviceToDelete}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete service')
      
      toast.success('Service deleted successfully')
      mutate() // Revalidate the data
      router.refresh()
    } catch (error) {
      console.error('Error deleting service:', error)
      toast.error('Failed to delete service')
    } finally {
      setIsModalOpen(false)
      setServiceToDelete(null)
    }
  }

  if (isLoading) return <p>Loading services...</p>
  if (error) return <p>Error loading services</p>

  const cancelDelete = () => {
    setIsModalOpen(false)
    setServiceToDelete(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Services</h1>
        <Link 
          href="/dashboard/services/new" 
          className="bg-[var(--color-subtitle)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
        >
          Add New Service
        </Link>
      </div>

      {isLoading ? (
        <p>Loading services...</p>
      ) : services.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-gray-500">No services found. Add your first service!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: Service) => (
            <Card key={service.id} className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3" style={{ color: 'var(--color-primary)' }}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Link
                  href={`/dashboard/services/${service.id}`}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    setServiceToDelete(service.id);
                    setIsModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add the confirmation modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}