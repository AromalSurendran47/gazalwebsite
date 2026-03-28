import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useNavigate, useParams } from 'react-router-dom'

// Video Card Component
const VideoCard = ({ project, handleVideoMouseEnter, handleVideoMouseLeave }) => {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const fullScreenVideoRef = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [seekProgress, setSeekProgress] = useState(0)

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

  return (
    <>
      <div
        ref={cardRef}
        className='video-card group relative overflow-hidden bg-black cursor-pointer'
        style={{ aspectRatio: '16/10' }}
        onMouseEnter={() => handleVideoMouseEnter(videoRef, cardRef, project.id)}
        onMouseLeave={() => handleVideoMouseLeave(videoRef, cardRef)}
        onClick={handleVideoClick}
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

      {/* Full Screen Modal */}
      {isFullScreen && (
        <div 
          className='fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center'
          onClick={handleCloseFullScreen}
        >
          <div className='relative w-full h-full flex items-center justify-center'>
            {/* Back Button */}
            <button
              onClick={handleCloseFullScreen}
              className='absolute top-8 left-8 z-50 text-white hover:text-[#D3FD50] transition-colors duration-300 flex items-center gap-3'
            >
              <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
              <span className='text-sm lg:text-base uppercase tracking-wider font-[font1]'>Back</span>
            </button>

            {/* Close Button */}
            <button
              onClick={handleCloseFullScreen}
              className='absolute top-8 right-8 z-50 text-white hover:text-[#D3FD50] transition-colors duration-300'
            >
              <svg className='w-12 h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
            
            {/* Custom Control Bar */}
            <div className='absolute top-24 left-1/2 transform -translate-x-1/2 z-40 bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3'>
              <div className='flex items-center gap-4'>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (fullScreenVideoRef.current) {
                      if (fullScreenVideoRef.current.paused) {
                        fullScreenVideoRef.current.play()
                      } else {
                        fullScreenVideoRef.current.pause()
                      }
                    }
                  }}
                  className='text-white hover:text-[#D3FD50] transition-colors duration-300'
                >
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={seekProgress}
                  className='w-32 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider'
                  onChange={(e) => {
                    if (fullScreenVideoRef.current) {
                      fullScreenVideoRef.current.currentTime = (e.target.value / 100) * fullScreenVideoRef.current.duration
                      setSeekProgress(e.target.value)
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (fullScreenVideoRef.current) {
                      fullScreenVideoRef.current.muted = !fullScreenVideoRef.current.muted
                    }
                  }}
                  className='text-white hover:text-[#D3FD50] transition-colors duration-300'
                >
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z' />
                  </svg>
                </button>
              </div>
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
                {project.title}
              </h3>
              <p className='text-lg text-white/80'>
                {project.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const ProjectDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const videoContainerRef = useRef(null)
  const backButtonRef = useRef(null)
  

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
    // {
    //   id: 12,
    //   title: 'Gym Hawk Zone',
    //   video: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773337084/gym_3_xlbb0g.mp4',
    //   category: 'Fitness',
    //   description: ' Fitness videography'
    // }
  ]

  // Filter projects based on URL parameter
  const filteredProjects = id === '1' 
    ? projects.filter(project => project.id === 1 || project.id === 20) // Show automotive videos for projectId 1
    : id === '2'
    ? projects.filter(project => project.id === 5 || project.id === 10 || project.id === 11 || project.id === 12) // Show interior and gym videos for projectId 2
    : id === '3'
    ? projects.filter(project => project.id === 7 || project.id === 8 || project.id === 15 || project.id === 16 || project.id === 17) // Show food reel videos for projectId 3
    : id === '4'
    ? projects.filter(project => project.id === 6 || project.id === 13 || project.id === 14) // Show portrait videos for projectId 4
    : id === '5'
    ? projects.filter(project => project.id === 2 || project.id === 18 || project.id === 19) // Show drift videos for projectId 5
    : projects.filter(project => project.id === parseInt(id))

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
    <div className='min-h-screen bg-black text-white font-[font1] overflow-hidden'>
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

