import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useNavigate } from 'react-router-dom'

// Video Card Component
const VideoCard = ({ project, handleVideoMouseEnter, handleVideoMouseLeave }) => {
  const videoRef = useRef(null)
  const cardRef = useRef(null)

  return (
    <div
      ref={cardRef}
      className='video-card group relative overflow-hidden bg-black cursor-pointer'
      style={{ aspectRatio: '16/10' }}
      onMouseEnter={() => handleVideoMouseEnter(videoRef, cardRef, project.id)}
      onMouseLeave={() => handleVideoMouseLeave(videoRef, cardRef)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className='h-full w-full object-cover'
        loop
        muted
        playsInline
        preload='metadata'
      >
        <source src={project.video} type='video/mp4' />
      </video>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500'></div>

      {/* Content Overlay */}
      <div className='absolute inset-0 flex flex-col justify-end p-6 lg:p-10 text-white'>
        {/* Category Badge */}
        <div className='mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
          <span className='inline-block text-xs uppercase tracking-[0.3em] px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full'>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className='font-[font2] text-4xl lg:text-5xl xl:text-6xl uppercase mb-2 tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75'>
          {project.title}
        </h3>

        {/* Description */}
        <p className='text-sm lg:text-base text-white/80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100'>
          {project.description}
        </p>

        {/* View Indicator */}
        <div className='mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150'>
          <span className='text-xs uppercase tracking-wider'>View Project</span>
          <svg
            className='w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </div>
      </div>

      {/* Border Effect */}
      <div className='absolute inset-0 border-2 border-white/0 group-hover:border-white/40 transition-all duration-500'></div>
    </div>
  )
}

const ProjectDetail = () => {
  const navigate = useNavigate()
  
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const videoContainerRef = useRef(null)
  const backButtonRef = useRef(null)
  

  const projects = [
    {
      id: 1,
      title: 'Automotive',
      video: '/projects/AUTOMOTIVE.mp4',
      category: 'Automotive',
      description: 'High-octane automotive cinematography'
    },
    {
      id: 2,
      title: 'Food Reel',
      video: '/projects/food reel post.mp4',
      category: 'Culinary',
      description: 'Gourmet visual storytelling'
    },
    {
      id: 3,
      title: 'Interior',
      video: '/projects/INTERIOR E REEL.mp4',
      category: 'Architecture',
      description: 'Elegant space design showcase'
    },
    {
      id: 4,
      title: 'Portraits',
      video: '/projects/potraits.mp4',
      category: 'Portrait',
      description: 'Capturing human essence'
    }
  ]

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(function () {
    // Hero section animation
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      })
    }

    // Title animation
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('div')
      gsap.from(words, {
        opacity: 0,
        y: 80,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      })
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.8
      })
    }

    // Video cards animation
    if (videoContainerRef.current) {
      const cards = videoContainerRef.current.querySelectorAll('.video-card')
      gsap.from(cards, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    }

    // Back button animation
    if (backButtonRef.current) {
      gsap.from(backButtonRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.6
      })
    }

    // Parallax effect on scroll
    gsap.utils.toArray('.video-card').forEach((card) => {
      gsap.to(card, {
        y: -50,
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })
    })
  })

  const handleVideoMouseEnter = (videoRef, cardRef, projectId) => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.03,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  }

  const handleVideoMouseLeave = (videoRef, cardRef) => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  }

  return (
    <div className='min-h-screen bg-white text-black font-[font1] overflow-hidden'>
      {/* Header Section */}
      <div className='relative pt-32 lg:pt-40 pb-20 px-5 lg:px-12'>
        <div className='max-w-[1800px] mx-auto'>
          {/* Back Button */}
          <div 
            ref={backButtonRef}
            onClick={() => navigate('/projects')}
            className='inline-flex items-center gap-3 mb-12 cursor-pointer group hover:text-[#D3FD50] transition-colors duration-300'
          >
            <svg 
              className='w-6 h-6 transform group-hover:-translate-x-2 transition-transform duration-300' 
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            <span className='text-sm lg:text-base uppercase tracking-wider font-[font1]'>Back to Projects</span>
          </div>

          {/* Hero Content */}
          <div ref={heroRef}>
            <div ref={titleRef} className='mb-6'>
              <h1 className='font-[font2] lg:text-[10vw] text-7xl uppercase leading-[0.9] tracking-tight'>
                {'Our Work'.split(' ').map((word, idx) => (
                  <div key={idx} className='inline-block mr-4'>{word}</div>
                ))}
              </h1>
            </div>
            
            <div ref={subtitleRef} className='mt-6'>
              <p className='text-lg lg:text-xl text-black/60 uppercase tracking-wider'>
                Creative Portfolio
              </p>
              <div className='mt-6 w-24 h-[2px] bg-black'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid Section */}
      <div ref={videoContainerRef} className='px-5 lg:px-12 pb-32'>
        <div className='max-w-[1800px] mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
            {projects.map((project) => (
              <VideoCard
                key={project.id}
                project={project}
                handleVideoMouseEnter={handleVideoMouseEnter}
                handleVideoMouseLeave={handleVideoMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className='px-5 lg:px-12 pb-20 pt-16 border-t border-black/10'>
        <div className='max-w-[1800px] mx-auto'>
          <div className='text-center'>
            <p className='text-sm lg:text-base text-black/40 uppercase tracking-widest mb-4'>
              Explore More
            </p>
            <button
              onClick={() => navigate('/projects')}
              className='inline-flex items-center gap-3 px-8 py-4 bg-black text-white uppercase tracking-wider text-sm lg:text-base hover:bg-[#D3FD50] hover:text-black transition-colors duration-300 font-[font1]'
            >
              <span>View All Projects</span>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

