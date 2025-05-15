'use client'

import { useState } from 'react'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

export default function ContactMessages({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      })

      if (!response.ok) throw new Error('Failed to update message status')

      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ))
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete message')

      setMessages(messages.filter(msg => msg.id !== messageId))
      if (selectedMessage?.id === messageId) setSelectedMessage(null)
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        {messages.map(message => (
          <div 
            key={message.id}
            className={`p-4 rounded-lg cursor-pointer ${
              !message.read ? 'bg-blue-50' : 'bg-white'
            } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}
            onClick={() => setSelectedMessage(message)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{message.name}</h3>
                <p className="text-sm text-gray-600">{message.subject}</p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg">
        {selectedMessage ? (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
              <div className="space-x-2">
                {!selectedMessage.read && (
                  <button
                    onClick={() => markAsRead(selectedMessage.id)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">From:</p>
                <p>{selectedMessage.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p>{selectedMessage.email}</p>
              </div>
              {selectedMessage.phone && (
                <div>
                  <p className="text-gray-600">Phone:</p>
                  <p>{selectedMessage.phone}</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Message:</p>
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select a message to view details
          </div>
        )}
      </div>
    </div>
  )
}