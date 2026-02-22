import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Contact = () => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const formCardRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [activeField, setActiveField] = useState(null)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div ref={containerRef} className='min-h-screen bg-[#050505] text-white font-[font1] overflow-hidden relative'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='orb-1 absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#D3FD50]/20 rounded-full blur-[120px]'></div>
        <div className='orb-2 absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]'></div>
      </div>

      {/* Grid Pattern */}
      <div className='absolute inset-0 opacity-[0.03]' style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>

      <div ref={contentRef} className='relative z-10 min-h-screen flex flex-col lg:flex-row'>
        {/* Left Side - Info */}
        <div className='w-full lg:w-1/2 px-6 md:px-12 lg:px-16 py-28 lg:py-0 flex flex-col justify-center'>
          <div className='max-w-xl'>
            <div className='overflow-hidden mb-4'>
              <p className='hero-text text-[#D3FD50] text-sm uppercase tracking-[0.3em] font-medium'>Contact</p>
            </div>
            
            <div className='overflow-hidden mb-2'>
              <h1 className='hero-text font-[font2] text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]'>
                Let's work
              </h1>
            </div>
            <div className='overflow-hidden mb-8'>
              <h1 className='hero-text font-[font2] text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#D3FD50] to-[#9EF01A]'>together</span>
              </h1>
            </div>

            <div className='overflow-hidden mb-12'>
              <p className='hero-text text-white/50 text-lg max-w-md leading-relaxed'>
                Have a project in mind? Let's create something extraordinary together.
              </p>
            </div>

            {/* Contact Info */}
            <div className='space-y-6'>
              <a href='mailto:metisprimeproduction@gmail.com' className='info-item group flex items-center gap-4'>
                <div className='w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-[#D3FD50]/10 group-hover:border-[#D3FD50]/30 transition-all duration-300'>
                  <svg className='w-6 h-6 text-[#D3FD50]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                </div>
                <div>
                  <p className='text-white/40 text-xs uppercase tracking-wider'>Email</p>
                  <p className='text-white group-hover:text-[#D3FD50] transition-colors text-sm md:text-base'>metisprimeproduction@gmail.com</p>
                </div>
              </a>

              <a href='tel:+971503596171' className='info-item group flex items-center gap-4'>
                <div className='w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-[#D3FD50]/10 group-hover:border-[#D3FD50]/30 transition-all duration-300'>
                  <svg className='w-6 h-6 text-[#D3FD50]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                  </svg>
                </div>
                <div>
                  <p className='text-white/40 text-xs uppercase tracking-wider'>Phone</p>
                  <p className='text-white group-hover:text-[#D3FD50] transition-colors'>+971 50 359 6171</p>
                </div>
              </a>

              <div className='info-item flex items-center gap-4'>
                <div className='w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center'>
                  <svg className='w-6 h-6 text-[#D3FD50]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                </div>
                <div>
                  <p className='text-white/40 text-xs uppercase tracking-wider'>Location</p>
                  <p className='text-white'>Dubai, UAE</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className='info-item flex gap-3 mt-10'>
              {['IG', 'FB', 'IN', 'BE'].map((s) => (
                <a key={s} href='#' className='w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-sm font-[font2] hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] transition-all duration-300'>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className='w-full lg:w-1/2 px-6 md:px-12 lg:px-16 py-12 lg:py-0 flex items-center justify-center'>
          <div 
            ref={formCardRef}
            className='w-full max-w-md bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 relative overflow-hidden'
          >
            {/* Card Glow */}
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-[#D3FD50]/20 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl'></div>

            <div className='relative z-10'>
              <h2 className='form-element font-[font2] text-2xl md:text-3xl mb-2'>Send a message</h2>
              <p className='form-element text-white/40 text-sm mb-8'>We'll respond within 24 hours</p>

              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Name */}
                <div className='form-element relative'>
                  <input
                    type='text'
                    placeholder='Your name'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    className={`w-full bg-white/5 border ${activeField === 'name' ? 'border-[#D3FD50]' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08]`}
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
                    className={`w-full bg-white/5 border ${activeField === 'email' ? 'border-[#D3FD50]' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08]`}
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
                    className={`w-full bg-white/5 border ${activeField === 'message' ? 'border-[#D3FD50]' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:bg-white/[0.08] resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type='submit'
                  className='form-element w-full py-4 bg-gradient-to-r from-[#D3FD50] to-[#9EF01A] text-black font-[font2] uppercase tracking-wider text-sm rounded-xl hover:shadow-lg hover:shadow-[#D3FD50]/25 transition-all duration-300 group flex items-center justify-center gap-2'
                >
                  Send Message
                  <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </button>
              </form>

              {/* Bottom Text */}
              <p className='form-element text-center text-white/30 text-xs mt-6 flex items-center justify-center gap-2'>
                <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                </svg>
                Your data is secure with us
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
  )
}

export default Contact
