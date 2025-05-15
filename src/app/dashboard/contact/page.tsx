import ContactMessages from '@/components/admin/ContactMessages'
import { prisma } from '@/lib/db'

export default async function ContactPage() {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <ContactMessages initialMessages={messages} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <div className="bg-red-50 p-4 rounded-md text-red-600">
          Error loading contact messages. Please make sure your database is properly configured.
        </div>
      </div>
    )
  }
}