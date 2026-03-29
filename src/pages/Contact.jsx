import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SEO from '../components/SEO/SEO'

const Contact = () => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const formCardRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [activeField, setActiveField] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-text', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1
    }, 0.2)

    tl.from('.info-item', {
      x: -30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8
    }, 0.5)

    tl.from(formCardRef.current, {
      y: 60,
      opacity: 0,
      duration: 1
    }, 0.4)

    tl.from('.form-element', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6
    }, 0.8)

    // Floating animation for orbs
    gsap.to('.orb-1', {
      y: -20,
      x: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to('.orb-2', {
      y: 15,
      x: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send email using EmailJS or similar service
      const response = await fetch('https://formspree.io/f/maqpzjqz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact Form Message from ${formData.name}`,
        }),
      })
      
      if (response.ok) {
        console.log('Form submitted successfully:', formData)
        setIsSent(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' })
          setIsSent(false)
        }, 3000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO 
        title="Contact"
        description="Contact Metis Prime Production for your next project. Get in touch with our team for exceptional digital production, branding, and creative services in Dubai, UAE."
        keywords="contact Metis Prime Production, creative agency contact, Dubai UAE, digital production contact, branding services, web development contact, cinematic videography"
        canonicalUrl="https://metisprimeproduction.com/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Metis Prime Production",
          "description": "Get in touch with Metis Prime Production for your next project",
          "provider": {
            "@type": "Organization",
            "name": "Metis Prime Production",
            "url": "https://metisprimeproduction.com",
            "email": "metisprimeproduction@gmail.com",
            "telephone": "+971507304941",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "UAE",
              "addressLocality": "Sharjah"
            }
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "metisprimeproduction@gmail.com",
            "telephone": "+971507304941",
            "contactType": "customer service",
            "availableLanguage": "English"
          }
        }}
      />
      <div ref={containerRef} className='min-h-screen bg-[#050505] text-white font-[font1] overflow-hidden relative'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='orb-1 absolute top-10 sm:top-20 left-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#D3FD50]/20 rounded-full blur-[60px] sm:blur-[100px] lg:blur-[120px]'></div>
        <div className='orb-2 absolute bottom-10 sm:bottom-20 right-1/4 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-purple-500/10 rounded-full blur-[50px] sm:blur-[80px] lg:blur-[100px]'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-500/5 rounded-full blur-[75px] sm:blur-[120px] lg:blur-[150px]'></div>
      </div>

      {/* Grid Pattern */}
      <div className='absolute inset-0 opacity-[0.03]' style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '30px 30px sm:45px 45px lg:60px 60px'
      }}></div>

      <div ref={contentRef} className='relative z-10 min-h-screen flex flex-col lg:flex-row max-w-[1400px] mx-auto'>
        {/* Left Side - Info */}
        <div className='w-full lg:w-1/2 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 lg:py-0 flex flex-col justify-center lg:justify-center min-h-[50vh] lg:min-h-screen'>
          <div className='max-w-md mx-auto lg:mx-0'>
            <div className='overflow-hidden mb-2 sm:mb-3'>
              <p className='hero-text text-[#D3FD50] text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] font-medium'>Contact</p>
            </div>
            
            <div className='overflow-hidden mb-1 sm:mb-2'>
              <h1 className='hero-text font-[font2] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-[0.8] sm:leading-[0.85] lg:leading-[0.9]'>
                Let's work
              </h1>
            </div>
            <div className='overflow-hidden mb-3 sm:mb-4 lg:mb-6'>
              <h1 className='hero-text font-[font2] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-[0.8] sm:leading-[0.85] lg:leading-[0.9]'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#D3FD50] to-[#9EF01A]'>together</span>
              </h1>
            </div>

            <div className='overflow-hidden mb-4 sm:mb-6 lg:mb-8'>
              <p className='hero-text text-white/50 text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-sm mx-auto lg:mx-0 leading-relaxed'>
                Have a project in mind? Let's create something extraordinary together.
              </p>
            </div>

            {/* Contact Info */}
            <div className='space-y-2 sm:space-y-3 lg:space-y-4'>
              <a href='mailto:metisprimeproduction@gmail.com' className='info-item group flex items-center gap-2 sm:gap-3'>
                <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-[#D3FD50]/10 group-hover:border-[#D3FD50]/30 transition-all duration-300'>
                  <svg className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#D3FD50]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-white/40 text-xs uppercase tracking-wider mb-1'>Email</p>
                  <p className='text-white group-hover:text-[#D3FD50] transition-colors text-xs sm:text-sm break-words'>metisprimeproduction@gmail.com</p>
                </div>
              </a>

              <a href='tel:+971503596171' className='info-item group flex items-center gap-2 sm:gap-3'>
                <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-[#D3FD50]/10 group-hover:border-[#D3FD50]/30 transition-all duration-300'>
                  <svg className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#D3FD50]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                  </svg>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-white/40 text-xs uppercase tracking-wider mb-1'>Phone</p>
                  <p className='text-white group-hover:text-[#D3FD50] transition-colors text-xs sm:text-sm'>+971507304941</p>
                </div>
              </a>

              <div className='info-item flex items-center gap-2 sm:gap-3'>
                <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center'>
                  <svg className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#D3FD50]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-white/40 text-xs uppercase tracking-wider mb-1'>Location</p>
                  <p className='text-white text-xs sm:text-sm'>Sharjah, UAE</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className='info-item flex gap-1 sm:gap-2 mt-3 sm:mt-4 lg:mt-6'>
              <a href='https://www.instagram.com/metisprime_production' target='_blank' rel='noopener noreferrer' className='w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-[font2] hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] transition-all duration-300'>
                IG
              </a>
              <a href='https://www.instagram.com/metisprime_production' target='_blank' rel='noopener noreferrer' className='w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-[font2] hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] transition-all duration-300'>
                IN
              </a>
              {['FB', 'BE'].map((s) => (
                <a key={s} href='#' className='w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-[font2] hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] transition-all duration-300'>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className='w-full lg:w-1/2 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-0 flex items-center justify-center min-h-[50vh] lg:min-h-screen'>
          <div 
            ref={formCardRef}
            className='w-full max-w-xs sm:max-w-sm bg-white/[0.03] backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden'
          >
            {/* Card Glow */}
            <div className='absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-40 sm:h-40 bg-[#D3FD50]/20 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/10 rounded-full blur-3xl'></div>

            <div className='relative z-10'>
              <h2 className='form-element font-[font2] text-xl sm:text-2xl md:text-3xl mb-2 text-center sm:text-left'>Send a message</h2>
              <p className='form-element text-white/40 text-xs sm:text-sm mb-6 sm:mb-8 text-center sm:text-left'>We'll respond within 24 hours</p>

              <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                {/* Name */}
                <div className='form-element relative'>
                  <input
                    type='text'
                    placeholder='Your name'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    className={`w-full bg-white/5 border ${activeField === 'name' ? 'border-[#D3FD50]' : 'border-white/10'} rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] text-sm sm:text-base`}
                  />
                </div>

                {/* Email */}
                <div className='form-element relative'>
                  <input
                    type='email'
                    placeholder='Your email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    className={`w-full bg-white/5 border ${activeField === 'email' ? 'border-[#D3FD50]' : 'border-white/10'} rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] text-sm sm:text-base`}
                  />
                </div>

                {/* Message */}
                <div className='form-element relative'>
                  <textarea
                    placeholder='Your message'
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    className={`w-full bg-white/5 border ${activeField === 'message' ? 'border-[#D3FD50]' : 'border-white/10'} rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] resize-none text-sm sm:text-base`}
                  />
                </div>

                {/* Submit */}
                <button
                  type='submit'
                  disabled={isSubmitting || isSent}
                  className={`w-full py-3 sm:py-4 font-[font2] uppercase tracking-wider text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-300 group flex items-center justify-center gap-2 ${
                    isSent 
                      ? 'bg-green-500 text-white cursor-default' 
                      : isSubmitting
                      ? 'bg-gray-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#D3FD50] to-[#9EF01A] text-black hover:shadow-lg hover:shadow-[#D3FD50]/25'
                  }`}
                >
                  {isSent ? (
                    <>
                      <svg className='w-3 h-3 sm:w-4 sm:h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                      <span className='text-xs sm:text-sm'>Message Sent!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <svg className='w-3 h-3 sm:w-4 sm:h-4 animate-spin' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 2v4m0 12v4M4.93 4.93l2.83 2.83m11.32 11.32l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m11.32-11.32l2.83-2.83' />
                      </svg>
                      <span className='text-xs sm:text-sm'>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className='text-xs sm:text-sm'>Send Message</span>
                      <svg className='w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Text */}
              <p className='form-element text-center text-white/30 text-xs mt-4 sm:mt-6 flex items-center justify-center gap-2 flex-wrap'>
                <span>Dubai UAE</span>
                <span className='text-[#D3FD50]'>●</span>
                <span>Creative Production</span>
                <span className='text-[#D3FD50]'>●</span>
                <span>Available for projects</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className='absolute bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-black/50 to-transparent overflow-hidden'>
        <div className='flex'>
          <div className='moveX flex items-center gap-8 text-white/10 text-sm uppercase tracking-[0.3em] whitespace-nowrap'>
            <span>Available for projects</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Dubai UAE</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Creative Production</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Available for projects</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Dubai UAE</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Creative Production</span>
            <span className='text-[#D3FD50]'>●</span>
          </div>
          <div className='moveX flex items-center gap-8 text-white/10 text-sm uppercase tracking-[0.3em] whitespace-nowrap'>
            <span>Available for projects</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Dubai UAE</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Creative Production</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Available for projects</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Dubai UAE</span>
            <span className='text-[#D3FD50]'>●</span>
            <span>Creative Production</span>
            <span className='text-[#D3FD50]'>●</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact
