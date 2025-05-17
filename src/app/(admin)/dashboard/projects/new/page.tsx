import Card from '@/components/admin/Card'
import ProjectForm from '@/components/admin/Forms/ProjectForm'

export default function NewProjectPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Add New Project</h1>
      </div>
      
      <Card>
        <ProjectForm />
      </Card>
    </div>
  )
}