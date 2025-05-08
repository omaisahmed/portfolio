import { prisma } from '@/lib/db'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <a
          href="/dashboard/projects/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Project
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: {
          id: string;
          imageUrl: string;
          title: string;
          description: string;
          tags: string[];
        }) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <a
                href={`/dashboard/projects/${project.id}/edit`}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </a>
              <button className="text-red-500 hover:text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}