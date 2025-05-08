'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'  // Fix: Changed from 'next/link' to 'next/image'
import Link from 'next/link'

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

export default function Contact() {
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    contact_subject: '',
    contact_message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
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
      document.body.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await window.emailjs.sendForm(
        'service_0ws32en',
        'template_6un774i',
        e.target as HTMLFormElement
      )
      setSubmitStatus('success')
      setFormData({
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        contact_subject: '',
        contact_message: ''
      })
      window.location.href = 'https://omaisahmed.github.io/folio'
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20" style={{ background: 'var(--background-color-2)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-lg mb-4 block" style={{ color: 'var(--color-subtitle)', fontFamily: 'var(--font-primary)' }}>
            Contact With Me
          </span>
          <h2 className="text-4xl font-bold" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-secondary)' }}>
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Contact Info */}
          <div 
            className="p-8 rounded-lg"
            style={{
              background: 'var(--background-color-1)',
              boxShadow: 'var(--shadow-1)',
              fontFamily: 'var(--font-primary)'
            }}
          >
            <div className="mb-6">
              <Image
                src="/assets/images/contact.png"
                alt="Omais Ahmed - Portfolio"
                width={500}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
            <div className="mb-6">
              <h4 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>Omais Ahmed</h4>
              <span style={{ color: 'var(--color-subtitle)' }}>Software Engineer</span>
            </div>
            <div className="mb-6" style={{ color: 'var(--color-body)' }}>
              <p className="mb-4">
                I am available for freelance work. Connect with me via email and call in to my account.
              </p>
              <div className="flex flex-col space-y-2">
                <span className="flex items-center">
                  Phone: <a href="tel:+923102135074" className="ml-2 hover:text-[var(--color-primary)]">+923102135074</a>
                </span>
                <span className="flex items-center">
                  Email: <a href="mailto:decentomais90@gmail.com" className="ml-2 hover:text-[var(--color-primary)]">decentomais90@gmail.com</a>
                </span>
              </div>
            </div>
            <div>
              <div className="mb-4" style={{ color: 'var(--color-lightn)' }}>MEET ME HERE</div>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/omais.ahmed.52/" target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </Link>
                <Link href="https://www.linkedin.com/in/omais-ahmed-679a0b144/" target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Link>
                <Link href="https://www.instagram.com/omais_ahmed_khan/" target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </Link>
                <Link href="https://api.whatsapp.com/send?phone=923102135074" target="_blank" className="hover:text-[var(--color-primary)] transition-colors duration-400" style={{ color: 'var(--color-lightn)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div 
            className="p-8 rounded-lg"
            style={{
              background: 'var(--background-color-1)',
              boxShadow: 'var(--shadow-1)',
              fontFamily: 'var(--font-primary)'
            }}
          >
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="contact_number" value={Math.random() * 100000 | 0} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    id="contact-name"
                    name="contact_name"
                    placeholder="Your Name"
                    required
                    value={formData.contact_name}
                    onChange={handleChange}
                    className="w-full p-5 rounded-lg bg-[var(--background-color-2)] text-[var(--color-body)] border-2 border-[var(--background-color-1)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-300 outline-none"
                    style={{ 
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="contact-email"
                    name="contact_email"
                    placeholder="Your Email"
                    required
                    value={formData.contact_email}
                    onChange={handleChange}
                    className="w-full p-5 rounded-lg bg-[var(--background-color-2)] text-[var(--color-body)] border-2 border-[var(--background-color-1)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-300 outline-none"
                    style={{ 
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </div>
              <div>
                <input
                  type="tel"
                  id="contact-phone"
                  name="contact_phone"
                  placeholder="Phone Number"
                  required
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className="w-full p-5 rounded-lg bg-[var(--background-color-2)] text-[var(--color-body)] border-2 border-[var(--background-color-1)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-300 outline-none"
                  style={{ 
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="subject"
                  name="contact_subject"
                  placeholder="Subject"
                  required
                  value={formData.contact_subject}
                  onChange={handleChange}
                  className="w-full p-5 rounded-lg bg-[var(--background-color-2)] text-[var(--color-body)] border-2 border-[var(--background-color-1)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-300 outline-none"
                  style={{ 
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
              <div>
                <textarea
                  id="contact-message"
                  name="contact_message"
                  placeholder="Your Message"
                  required
                  value={formData.contact_message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-5 rounded-lg bg-[var(--background-color-2)] text-[var(--color-body)] border-2 border-[var(--background-color-1)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-300 outline-none"
                  style={{ 
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rn-btn w-full"
                style={{
                  boxShadow: 'var(--shadow-1)',
                  position: 'relative',
                  zIndex: 2,
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  background: 'linear-gradient(145deg, rgb(30, 32, 36), rgb(35, 39, 43))',
                  transition: 'var(--transition)',
                  border: 'none',
                  display: 'inline-block',
                  color: 'var(--color-primary)',
                  padding: '15px 35px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-500 text-center">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center">Error sending message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}