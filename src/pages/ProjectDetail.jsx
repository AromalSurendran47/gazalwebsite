import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useNavigate, useParams } from 'react-router-dom'
import { slugify } from '../utils/slugify'

// Video Card Component
const VideoCard = ({ project, handleVideoMouseEnter, handleVideoMouseLeave }) => {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const fullScreenVideoRef = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [seekProgress, setSeekProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleVideoClick = () => {
    setIsFullScreen(true)
  }

  const handleCloseFullScreen = () => {
    setIsFullScreen(false)
    setSeekProgress(0)
  }

  // Update seek bar as video plays
  useEffect(() => {
    if (isFullScreen && fullScreenVideoRef.current) {
      const video = fullScreenVideoRef.current

      const updateProgress = () => {
        if (video.duration) {
          setSeekProgress((video.currentTime / video.duration) * 100)
        }
      }

      video.addEventListener('timeupdate', updateProgress)

      return () => {
        video.removeEventListener('timeupdate', updateProgress)
      }
    }
  }, [isFullScreen])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullScreen])

  return (
    <>
      <div
        ref={cardRef}
        className='video-card group relative bg-[#0a0a0a] cursor-pointer p-2 sm:p-3 rounded-2xl border border-white/10 hover:border-[#D3FD50]/40 transition-colors duration-500'
        style={{ aspectRatio: '16/10' }}
        onMouseEnter={() => !isMobile && handleVideoMouseEnter(videoRef, cardRef, project.id)}
        onMouseLeave={() => !isMobile && handleVideoMouseLeave(videoRef, cardRef)}
        onClick={handleVideoClick}
      >
        {/* Video on desktop, Image on mobile */}
        {!isMobile ? (
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
        ) : (
          <img
            src={project.video.replace('.mp4', '.jpg')}
            alt={project.description || 'Project'}
            className='h-full w-full object-cover'
            loading='lazy'
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/fallback${project.id}/800/500.jpg`;
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10'></div>

        {/* Content Overlay */}
        <div className='absolute inset-0 flex flex-col justify-end p-5 lg:p-8 text-white z-20 pointer-events-none'>
          {/* Category Badge */}
          <div className='mb-3 lg:mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
            <span className='inline-block text-[10px] lg:text-xs uppercase tracking-[0.3em] px-3 py-1.5 lg:px-4 lg:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full'>
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className='font-[font2] text-4xl lg:text-5xl xl:text-6xl uppercase mb-2 tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75'>
            {project.title || project.category}
          </h3>

          {/* Description */}
          <p className='text-xs lg:text-sm text-white/80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 line-clamp-2 pt-2'>
            {project.description}
          </p>

          {/* View Indicator */}
          <div className='mt-4 lg:mt-6 flex items-center gap-2 lg:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 text-[#D3FD50]'>
            <span className='text-[10px] lg:text-xs uppercase tracking-wider font-semibold'>Play Video</span>
            <svg
              className='w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-2 transition-transform duration-300'
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
      </div>

      {/* Scrollable, Full-Size Beautiful Project Modal */}
      {
        isFullScreen && (
          <div
            className='fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl overflow-y-auto transition-opacity duration-500'
            onClick={handleCloseFullScreen}
          >
            {/* Fixed Floating Close Button */}
            <button
              onClick={handleCloseFullScreen}
              className='fixed top-6 right-6 lg:top-10 lg:right-10 z-[120] p-4 bg-white/10 hover:bg-[#D3FD50] border border-white/20 rounded-full text-white hover:text-black transition-all duration-300 transform hover:rotate-90 hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
            >
              <svg className='w-6 h-6 lg:w-8 lg:h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>

            {/* Modal Inner Scroll Container - Designed for auto-centering and safe scrolling */}
            <div className='flex flex-col min-h-[100vh] w-full pt-20 pb-24 sm:py-24 px-0 sm:px-6 lg:px-12 relative'>
              <div className='m-auto w-full max-w-[1200px] flex flex-col'>

                {/* Project Header Container */}
                <div className='w-full px-6 sm:px-0 mb-6 lg:mb-12 text-left' onClick={(e) => e.stopPropagation()}>
                  <span className='inline-block text-[#D3FD50] text-[10px] lg:text-sm uppercase tracking-[0.3em] font-bold px-4 py-2 bg-[#D3FD50]/10 rounded-full mb-4 border border-[#D3FD50]/20'>
                    {project.category}
                  </span>
                  <h2 className='font-[font2] text-4xl sm:text-5xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-white mb-4 drop-shadow-2xl'>
                    {project.title}
                  </h2>
                  <p className='text-sm sm:text-base lg:text-xl text-white/70 font-[font1] max-w-3xl leading-relaxed'>
                    {project.description}
                  </p>
                </div>

                {/* Main Video Container */}

              </div>

              {/* Full Screen Video */}
              <video
                ref={fullScreenVideoRef}
                className='max-w-full max-h-full object-contain'
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={project.video} type='video/mp4' />
              </video>

              {/* Video Info */}
              <div className='absolute bottom-8 left-8 text-white'>
                <h3 className='font-[font2] text-4xl lg:text-5xl uppercase mb-2'>
                  {project.title || project.category}
                </h3>
                <p className='text-lg text-white/80'>
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

const ProjectDetail = () => {
  const navigate = useNavigate()
  const { slug } = useParams()

  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const videoContainerRef = useRef(null)
  const backButtonRef = useRef(null)

  // Automatically scroll the page down to the video grid whenever navigating to an ID route
  useEffect(() => {
    if (videoContainerRef.current) {
      // A small timeout ensures components and initial layout have rendered
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = videoContainerRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 300);
    }
  }, [slug]);

  const projects = [
    {
      id: 1,
      // title: 'Automotive Gallery',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773405539/MV_AUGUSTA_REEL_pr6rth.mp4',
      category: 'Automotive',
      description: 'MV AGUSTA F3'
    },
    {
      id: 20,
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1774718693/bike_zpaert.mp4',
      category: 'Automotive',
      description: 'MV AGUSTA F3'
    },
    {
      id: 2,
      // title: 'Automotive Gallery',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773404608/drift_htdsre.mp4',
      category: 'DX.Drift',
      description: 'Motorsports event shoot | DX Drift UAE'
    },
    {
      id: 18,

      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773404787/Copy_of_HD_stunt_video_1_hf7gnv.mp4',
      category: 'HD Stunt',
      description: 'Motorbike Stunt Shoot'
    },
    {
      id: 19,
      // title: 'Arcam Event Video',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773405121/arcam_event_video_final_out_1_lsarv1.mp4',
      category: 'Club style Dubai',
      description: 'Live Stunt Event Capture | HD Stund'
    },
    {
      id: 4,
      title: 'Food Reel',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773336858/food_reel_post_wkwjpq.mp4',
      category: ' Food videography',
      description: 'Hilton  garden inn,Trivandrum'
    },
    {
      id: 7,
      // title: 'Food Reel 1',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773336853/food_1_jnd01r.mp4',
      category: ' Food videography',
      description: 'Hilton  garden inn,Trivandrum'
    },
    {
      id: 8,
      // title: 'Food Reel 2',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773336854/food_2_hk3prw.mp4',
      category: ' Food videography',
      description: 'Saj,Luciya,Trivandrum'
    },
    {
      id: 15,

      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773340953/hilton_chef_azad_x8hno0.mp4',
      category: ' Food videography',
      description: 'Hilton  garden inn,Trivandrum'
    },
    {
      id: 16,

      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773340950/HILTON_3_ir2srf.mp4',
      category: ' Food videography',
      description: 'Hilton  garden inn,Trivandrum'
    },
    {
      id: 17,

      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773340945/hilton3_gqh4on.mp4',
      category: ' Food videography',
      description: 'Hilton  garden inn,Trivandrum'
    },
    // {
    //   id: 5,
    //   title: 'Interior',
    //   video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773336859/INTERIOR_E_REEL_evdhc9.mp4',
    //   category: 'Architecture',
    //   description: 'Elegant space design showcase'
    // },
    {
      id: 6,
      title: 'Amber Juice',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773336870/poratait_1_kladwx.mp4',
      category: 'Perfume',
      description: 'Perfume Branding Shoot'
    },
    {
      id: 13,
      title: 'Leather Black',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773339984/IMG_4059_qonbsl.mp4',
      category: 'Perfume',
      description: 'Perfume Branding Shoot'
    },
    {
      id: 14,
      title: 'After Dark',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773339994/IMG_4222_kqvdsb.mp4',
      category: 'Perfume',
      description: 'Perfume Branding Shoot'
    }
    // {
    //   id: 9,
    //   title: 'Portraits Main',
    //   video: '/projects/potraits.mp4',
    //   category: 'Portrait',
    //   description: 'Capturing human essence'
    // }
    ,
    {
      id: 10,
      title: 'Gym Hawk Zone',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773337084/gym_1_iuq9un.mp4',
      category: 'Fitness',
      description: ' Fitness videography'
    },
    {
      id: 11,
      title: 'Gym Hawk Zone',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773336746/gym_2_jcu0dk.mp4',
      category: 'Fitness',
      description: ' Fitness videography'
    },
    {
      id: 12,
      title: 'Red Gym, Dubai',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1775313822/red_gym_idf9j0.mp4',
      category: 'Fitness',
      description: 'Fitness videography'
    },
    {
      id: 21,
      title: 'Red Gym, Dubai',
      video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1775314656/reel_xakfil.mp4',
      category: 'Fitness',
      description: 'Fitness videography'
    }
  ]

  // Create slug to ID mapping
  const slugToIdMap = {
    'automotive': '1',
    'fitness': '2',
    'food-reel': '3',
    'potraits': '4',
    'drift': '5'
  }

  // Convert slug to ID if needed
  const projectId = slugToIdMap[slug] || slug

  // Filter projects based on URL parameter
  const filteredProjects = projectId === '1'
    ? projects.filter(project => project.id === 1 || project.id === 20) // Show automotive videos for projectId 1
    : projectId === '2'
      ? projects.filter(project => project.id === 5 || project.id === 10 || project.id === 11 || project.id === 12 || project.id === 21) // Show interior and gym videos for projectId 2
      : projectId === '3'
        ? projects.filter(project => project.id === 7 || project.id === 8 || project.id === 15 || project.id === 16 || project.id === 17) // Show food reel videos for projectId 3
        : projectId === '4'
          ? projects.filter(project => project.id === 6 || project.id === 13 || project.id === 14) // Show portrait videos for projectId 4
          : projectId === '5'
            ? projects.filter(project => project.id === 2 || project.id === 18 || project.id === 19) // Show drift videos for projectId 5
            : projects.filter(project => project.id === parseInt(projectId))


  gsap.registerPlugin(ScrollTrigger)

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    // Don't play videos on mobile
    if (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return
    }

    if (videoRef.current) {
      videoRef.current.play().catch(() => { })
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
    // Don't handle videos on mobile
    if (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return
    }

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
    <div className='min-h-screen bg-black text-white font-[font1] overflow-hidden'>
      {/* Header Section */}
      <div className='relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-20 px-5 lg:px-12'>
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
                {'Our Work '.split(' ').map((word, idx) => (
                  <div key={idx} className='inline-block mr-4'>{word}</div>
                ))}
              </h1>
            </div>

            <div ref={subtitleRef} className='mt-6'>
              <p className='text-lg lg:text-xl text-white/60 uppercase tracking-wider'>
                Creative Portfolio
              </p>
              <div className='mt-6 w-24 h-[2px] bg-white'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid Section */}
      <div ref={videoContainerRef} className='px-5 lg:px-12 pb-32'>
        <div className='max-w-[1800px] mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
            {filteredProjects.map((project) => (
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

