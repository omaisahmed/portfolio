'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'  // Fix: Changed from 'next/link' to 'next/image'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Add EmailJS type declarations
declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      sendForm: (
        serviceId: string,
        templateId: string,
        form: HTMLFormElement,
        publicKey?: string
      ) => Promise<any>;
    };
  }
}

interface ContactInfo {
  id: string
  image?: string
  name: string
  title: string
  email: string
  phone: string
  description: string
  githubUrl?: string
  linkedinUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  whatsappNumber?: string
  twitterUrl?: string
}

export default function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    'contact-name': '',
    'contact-email': '',
    'contact-phone': '',
    'subject': '',
    'contact-message': ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/contact')
        if (!response.ok) throw new Error('Failed to fetch contact information')
        const data = await response.json()
        setContactInfo(data)
      } catch (error) {
        console.error('Error fetching contact information:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()

    // Load EmailJS script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // Initialize EmailJS
      window.emailjs.init('_gICZbeyFCiOD47uR')
    }

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const form = e.target as HTMLFormElement
      // First send email via EmailJS
      await window.emailjs.sendForm(
        'service_cdkuhe8',
        'template_5v6jeg9',
        form,
        '_gICZbeyFCiOD47uR'
      )

      // Then store the message in database
      const messageData = {
        name: formData['contact-name'],
        email: formData['contact-email'],
        phone: formData['contact-phone'] || null,
        subject: formData.subject,
        message: formData['contact-message'],
        read: false
      }

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      })

      if (!response.ok) {
        throw new Error('Failed to save message')
      }
      
      setSubmitStatus('success')
      setFormData({
        'contact-name': '',
        'contact-email': '',
        'contact-phone': '',
        'subject': '',
        'contact-message': ''
      })
      
      toast.success('Message sent successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      toast.error('Error sending message. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section id="contact" className="py-20" style={{ background: 'var(--background-color-1)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">Loading contact information...</div>
        </div>
      </section>
    )
  }

  if (!contactInfo) {
    return null
  }
  return (
    <section id="contact" className="py-20" style={{ background: 'var(--background-color-1)' }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-lg mb-4 block" style={{ color: 'var(--color-subtitle)', fontFamily: 'var(--font-primary)' }}>
            Get in Touch
          </span>
          <h2 className="text-4xl font-bold" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-secondary)' }}>
            Contact Me
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="p-6 rounded-lg" style={{ background: 'var(--background-color-2)', boxShadow: 'var(--shadow-1)' }}>
            <div className="items-center space-x-4 mb-6">
              {contactInfo?.image && (
                <div className="overflow-hidden border-2 border-[var(--color-primary)] rounded-lg">
                  <img src={contactInfo.image} alt={contactInfo.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className='mt-5'>
                <h3 className="text-xl font-bold" style={{ color: 'var(--color-heading)' }}>{contactInfo?.name}</h3>
                <p style={{ color: 'var(--color-body)' }}>{contactInfo?.title}</p>
              </div>
            </div>

            <p className="mb-6" style={{ color: 'var(--color-body)' }}>{contactInfo?.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: 'var(--background-color-1)', color: 'var(--color-primary)' }}>
                  📧
                </span>
                <a href={`mailto:${contactInfo?.email}`} style={{ color: 'var(--color-body)' }} className="hover:text-[var(--color-primary)]">
                  {contactInfo?.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: 'var(--background-color-1)', color: 'var(--color-primary)' }}>
                  📱
                </span>
                <a href={`tel:${contactInfo?.phone}`} style={{ color: 'var(--color-body)' }} className="hover:text-[var(--color-primary)]">
                  {contactInfo?.phone}
                </a>
              </div>
            </div>

            <div className="flex space-x-3">
              {contactInfo?.githubUrl && (
                <a 
                  href={contactInfo.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-[var(--color-primary)]"
                  style={{ background: 'var(--background-color-1)', color: 'var(--color-body)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              )}
              {contactInfo?.linkedinUrl && (
                <a 
                  href={contactInfo.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-[var(--color-primary)]"
                  style={{ background: 'var(--background-color-1)', color: 'var(--color-body)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              )}
              {contactInfo?.twitterUrl && (
                <a 
                  href={contactInfo.twitterUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-[var(--color-primary)]"
                  style={{ background: 'var(--background-color-1)', color: 'var(--color-body)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              )}
              {contactInfo?.facebookUrl && (
                <a 
                  href={contactInfo.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-[var(--color-primary)]"
                  style={{ background: 'var(--background-color-1)', color: 'var(--color-body)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              )}
              {contactInfo?.instagramUrl && (
                <a 
                  href={contactInfo.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-[var(--color-primary)]"
                  style={{ background: 'var(--background-color-1)', color: 'var(--color-body)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              )}
              {contactInfo?.whatsappNumber && (
                <a 
                  href={`https://wa.me/${contactInfo.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-[var(--color-primary)]"
                  style={{ background: 'var(--background-color-1)', color: 'var(--color-body)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                </a>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 rounded-lg" style={{ background: 'var(--background-color-2)', boxShadow: 'var(--shadow-1)' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-heading)' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="contact-name"
                  value={formData['contact-name']}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition-all duration-200 contact-form-input"
                  style={{ 
                    background: 'var(--background-color-1)', 
                    border: '1px solid var(--color-subtitle)',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-heading)' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="contact-email"
                  value={formData['contact-email']}
                  onChange={handleChange}
                  className="contact-form-input w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition-all duration-200"
                  style={{ 
                    background: 'var(--background-color-1)', 
                    color: 'rgb(255, 255, 255) !important',
                    border: '1px solid var(--color-subtitle)',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-heading)' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="contact-phone"
                  value={formData['contact-phone']}
                  onChange={handleChange}
                  className="contact-form-input w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition-all duration-200"
                  style={{ 
                    background: 'var(--background-color-1)', 
                    color: 'rgb(255, 255, 255) !important',
                    border: '1px solid var(--color-subtitle)',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-heading)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-form-input w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition-all duration-200"
                  style={{ 
                    background: 'var(--background-color-1)', 
                    color: 'rgb(255, 255, 255) !important',
                    border: '1px solid var(--color-subtitle)',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-heading)' }}>
                  Message
                </label>
                <textarea
                  name="contact-message"
                  value={formData['contact-message']}
                  onChange={handleChange}
                  rows={4}
                  className="contact-form-input w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition-all duration-200"
                  style={{ 
                    background: 'var(--background-color-1)', 
                    color: 'rgb(255, 255, 255) !important',
                    border: '1px solid var(--color-subtitle)',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-white rounded-lg transition-colors duration-300 hover:opacity-90 disabled:opacity-50"
                style={{ background: 'var(--color-primary)' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}