'use client'

import { useSettings } from '@/lib/hooks/useData'
import Card from '@/components/admin/Card'
import SettingsForm from '@/components/admin/Forms/SettingsForm'

export default function SettingsPage() {
  const { data: settings, error, isLoading } = useSettings()

  if (isLoading) return <p>Loading settings...</p>
  if (error) return <p>Error loading settings</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Site Settings</h1>
      </div>
      
      <Card>
        <SettingsForm settings={settings} />
      </Card>
    </div>
  )
}