import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'
import ServiceCarousel from '../components/services/ServiceCarousel'

const Services = () => {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const ctaRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(function () {
    // Hero animation
    gsap.from(heroRef.current?.children || [], {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    })

    // Services cards animation
    if (servicesRef.current) {
      const cards = servicesRef.current.querySelectorAll('.service-item')
      gsap.from(cards, {
        opacity: 0,
        y: 100,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    }
  })

  const services = [
    {
      title: 'Social Media Marketing',
      description: 'Transform your brand presence across all social platforms. We create engaging content, manage your accounts, and build meaningful connections with your audience to drive growth and engagement.',
      images: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop'
      ],
      features: ['Content Strategy', 'Community Management', 'Analytics & Reporting', 'Campaign Management']
    },
    {
      title: 'Influencer Marketing',
      description: 'Connect with the right influencers to amplify your brand message. We identify, negotiate, and manage partnerships that drive authentic engagement and measurable results.',
      images: [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop'
      ],
      features: ['Influencer Discovery', 'Partnership Management', 'Campaign Execution', 'ROI Tracking']
    },
    {
      title: 'Market Research',
      description: 'Make data-driven decisions with comprehensive market research. We analyze trends, consumer behavior, and competitive landscapes to guide your strategic direction.',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'
      ],
      features: ['Consumer Insights', 'Competitive Analysis', 'Trend Forecasting', 'Data Visualization']
    },
    {
      title: 'Website Design & Development',
      description: 'Create stunning, high-performing websites that convert visitors into customers. From concept to launch, we deliver responsive, fast, and user-friendly digital experiences.',
      images: [
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop'
      ],
      features: ['UI/UX Design', 'Frontend Development', 'Backend Integration', 'Performance Optimization']
    },
    {
      title: 'Branding & Design',
      description: 'Build a memorable brand identity that resonates with your audience. We craft logos, visual systems, and brand guidelines that tell your unique story.',
      images: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop'
      ],
      features: ['Logo Design', 'Brand Identity', 'Visual Guidelines', 'Creative Direction']
    },
    {
      title: 'Digital Marketing',
      description: 'Maximize your online presence with comprehensive digital marketing strategies. We combine SEO, PPC, content marketing, and analytics to drive sustainable growth.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop'
      ],
      features: ['SEO Optimization', 'PPC Campaigns', 'Content Marketing', 'Performance Analytics']
    }
  ]

  return (
    <div className='min-h-screen bg-black text-white font-[font1] overflow-hidden'>
      
      {/* Hero Section - Modern Landing */}
      <div className='relative w-full min-h-screen lg:h-screen flex items-center justify-center px-5 lg:px-12 py-20 lg:py-0 overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#D3FD50]/5 rounded-full blur-3xl'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D3FD50]/5 rounded-full blur-3xl'></div>
        </div>

        <div 
          ref={heroRef}
          className='relative z-10 w-full max-w-7xl mx-auto text-center font-[font1]'
        >
          {/* Main Heading with modern typography */}
          <div className='space-y-2 lg:space-y-4 mb-8 lg:mb-12'>
            <div className='lg:text-[9.5vw] text-[12vw] justify-center flex items-center uppercase lg:leading-[8vw] leading-[10vw] font-[font2]'>
              Services
            </div>
          </div>

          {/* Tagline */}
          <p className='lg:text-2xl text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mb-12 lg:mb-16'>
            We deliver exceptional digital solutions to elevate your brand and drive meaningful results
          </p>

          {/* Service count badges */}
          <div className='flex flex-wrap justify-center gap-4 lg:gap-6 mb-12 lg:mb-16'>
            {services.map((service, index) => (
              <div
                key={index}
                className='px-4 lg:px-6 py-2 lg:py-3 border border-white/20 hover:border-[#D3FD50] bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-full'
              >
                <span className='text-xs lg:text-sm uppercase tracking-wider text-white/80'>
                  {service.title.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className='flex flex-col items-center gap-2 animate-bounce'>
            <span className='text-xs uppercase tracking-[0.3em] text-white/60'>Scroll</span>
            <div className='w-px h-12 bg-gradient-to-b from-[#D3FD50] to-transparent'></div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className='py-20 lg:py-32 px-5 lg:px-12'>
        <div className='max-w-7xl mx-auto space-y-32 lg:space-y-40'>
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-item flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Image Carousel */}
              <div className='w-full lg:w-1/2 h-[400px] lg:h-[600px] relative overflow-hidden rounded-lg'>
                <ServiceCarousel 
                  images={service.images} 
                  autoPlay={true} 
                  interval={4000}
                />
              </div>

              {/* Content */}
              <div className='w-full lg:w-1/2 space-y-6'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='w-1 h-16 bg-[#D3FD50]'></div>
                  <h2 className='font-[font2] text-4xl lg:text-6xl uppercase leading-tight'>
                    {service.title}
                  </h2>
                </div>
                
                <p className='text-lg lg:text-xl text-white/80 leading-relaxed'>
                  {service.description}
                </p>

                {/* Features List */}
                <div className='grid grid-cols-2 gap-4 mt-8'>
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className='flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded'
                    >
                      <div className='w-2 h-2 rounded-full bg-[#D3FD50] flex-shrink-0'></div>
                      <span className='text-sm lg:text-base'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className='py-20 lg:py-32 px-5 lg:px-12 bg-white/5'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
            {[
              { number: '200+', label: 'Projects Delivered' },
              { number: '30+', label: 'Happy Clients' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '5+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='font-[font2] text-5xl lg:text-7xl text-[#D3FD50] mb-4'>
                  {stat.number}
                </div>
                <div className='text-sm lg:text-base text-white/70 uppercase tracking-wider'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div ref={ctaRef} className='py-20 lg:py-32 px-5 lg:px-12'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <h2 className='font-[font2] text-5xl lg:text-7xl uppercase leading-tight'>
            Ready to Get Started?
          </h2>
          <p className='text-xl lg:text-2xl text-white/80 leading-relaxed'>
            Let's discuss how we can help transform your digital presence and achieve your business goals.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-8'>
            <Link
              to='/contact'
              className='px-10 lg:px-16 py-4 lg:py-6 bg-[#D3FD50] text-black font-[font2] text-lg lg:text-xl uppercase hover:bg-[#D3FD50]/90 transition-colors'
            >
              Get In Touch
            </Link>
            <Link
              to='/projects'
              className='px-10 lg:px-16 py-4 lg:py-6 border-2 border-white text-white font-[font2] text-lg lg:text-xl uppercase hover:bg-white hover:text-black transition-colors'
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Services
