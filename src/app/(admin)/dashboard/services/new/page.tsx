'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ServiceForm from '@/components/admin/Forms/ServiceForm'
import Card from '@/components/admin/Card'

export default function NewServicePage() {
  const router = useRouter()
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Add New Service</h1>
      </div>
      
      <Card>
        <ServiceForm />
      </Card>
    </div>
  )
}