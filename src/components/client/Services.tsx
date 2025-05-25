'use client'

import { useServices } from '@/lib/hooks/useData'

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

const ServiceCard = ({ service }: { service: Service }) => (
  <div
    className="p-8 rounded-lg transition-all duration-400 hover:translate-y-[-10px]"
    style={{
      background: 'var(--background-color-1)',
      boxShadow: 'var(--shadow-1)',
      fontFamily: 'var(--font-primary)'
    }}
  >
    <div className="text-4xl mb-4" style={{ color: 'var(--color-primary)' }}>
      {service.icon}
    </div>
    <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
      {service.title}
    </h3>
    <p style={{ color: 'var(--color-body)' }}>
      {service.description}
    </p>
  </div>
)

export default function Services() {

  const { data: services, error, isLoading } = useServices()

  if (isLoading) return <div>Loading services...</div>
  if (error) return <div>Error loading services</div>
  if (!services) return null
  
  // const [services, setServices] = useState<Service[]>([])

  // useEffect(() => {
  //   fetch('/api/services')
  //     .then(res => res.json())
  //     .then(data => setServices(data))
  //     .catch(error => console.error('Error fetching services:', error))
  // }, [])

  return (
    <section id="services" className="py-20" style={{ background: 'var(--background-color-2)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-lg mb-4 block" style={{ color: 'var(--color-subtitle)', fontFamily: 'var(--font-primary)' }}>
            What Do I Do
          </span>
          <h2 className="text-4xl font-bold" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-secondary)' }}>
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: Service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}