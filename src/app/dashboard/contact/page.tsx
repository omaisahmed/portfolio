import ContactMessages from '@/components/admin/ContactMessages'
import { prisma } from '@/lib/db'

export default async function ContactPage() {
  try {
    // Check if the Contact model exists in the Prisma client
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    }).catch(err => {
      console.error('Error querying contact table:', err)
      return []
    })

    // Ensure messages is properly formatted for the component
    const formattedMessages = Array.isArray(messages) ? messages.map(msg => ({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      phone: msg.phone || '',
      read: Boolean(msg.read),
      createdAt: msg.createdAt instanceof Date ? msg.createdAt : new Date(msg.createdAt)
    })) : []

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-black">Contact Messages</h1>
        <ContactMessages initialMessages={messages || []} />
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