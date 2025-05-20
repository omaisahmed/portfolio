'use client'

import { useState } from 'react'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { toast } from 'react-toastify'

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {  // Changed from /api/contact to /api/messages
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'Failed to update message status')
      }

      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ))
      toast.success('Message marked as read')
    } catch (error) {
      console.error('Error marking message as read:', error)
      toast.error('Failed to mark message as read')
    }
  }

  const handleDeleteClick = (messageId: string) => {
    setMessageToDelete(messageId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!messageToDelete) return

    try {
      const response = await fetch(`/api/messages/${messageToDelete}`, {  // Changed from /api/contact to /api/messages
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'Failed to delete message')
      }

      setMessages(messages.filter(msg => msg.id !== messageToDelete))
      if (selectedMessage?.id === messageToDelete) setSelectedMessage(null)
      toast.success('Message deleted successfully')
    } catch (error) {
      console.error('Error deleting message:', error)
      toast.error('Failed to delete message')
    } finally {
      setIsDeleteModalOpen(false)
      setMessageToDelete(null)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-3 bg-white p-4 rounded-xl shadow-sm">
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  !message.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'
                } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-400 shadow-md' : 'hover:shadow-md hover:border-blue-200'}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      {message.name}
                      {!message.read && (
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{message.subject}</p>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h2>
                <div className="space-x-2">
                  {!selectedMessage.read && (
                    <button
                      onClick={() => markAsRead(selectedMessage.id)}
                      className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(selectedMessage.id)}
                    className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">From</p>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">{selectedMessage.phone}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-gray-900">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <p className="text-sm font-medium text-gray-500">Message</p>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false)
          setMessageToDelete(null)
        }}
      />
    </>
  )
}