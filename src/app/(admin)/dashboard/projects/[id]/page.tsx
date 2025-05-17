import Card from '@/components/admin/Card'
import ProjectForm from '@/components/admin/Forms/ProjectForm'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id }
  })

  if (!project) {
    notFound()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Edit Project</h1>
      </div>
      
      <Card>
        <ProjectForm 
          project={{
            ...project,
            liveUrl: project.liveUrl || '',
            githubUrl: project.githubUrl || '',
            tags: Array.isArray(project.tags) ? project.tags : []
          }} 
        />
      </Card>
    </div>
  )
}